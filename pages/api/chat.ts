import type { NextRequest } from 'next/server';
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

import { UiMessage } from '../../components/ChatMessage';


if (!process.env.OPENAI_API_KEY)
  throw new Error('Please provide OPENAI_API_KEY in this deployment environment.');


export type OpenAIChatInput = Omit<OpenAIStreamPayload, 'stream' | 'n'>

interface OpenAIStreamPayload {
  model: 'gpt-4' | string;
  messages: ChatGPTMessage[];
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  stream: boolean;
  n: number;
}

export type ChatGPTAgent = 'user' | 'system' | 'assistant';

interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

interface ChatGPTChunkedResponse {
  id: string; // unique id of this chunk
  object: 'chat.completion.chunk';
  created: number; // unix timestamp in seconds
  model: string; // can differ from the ask, e.g. 'gpt-4-0314'
  choices: {
    delta: Partial<ChatGPTMessage>;
    index: number; // always 0s for n=1
    finish_reason: 'stop' | 'length' | null;
  }[];
}


export async function OpenAIStream(payload: OpenAIChatInput): Promise<ReadableStream> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const streamPayload: OpenAIStreamPayload = {
    ...payload,
    stream: true,
    n: 1,
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(streamPayload),
  });

  return new ReadableStream({
    async start(controller) {

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser((event: ParsedEvent | ReconnectInterval) => {
        // ignore reconnect interval
        if (event.type !== 'event')
          return;

        // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
        if (event.data === '[DONE]') {
          controller.close();
          return;
        }

        try {
          const json: ChatGPTChunkedResponse = JSON.parse(event.data);

          // ignore any 'role' delta update
          if (json.choices[0].delta?.role)
            return;

          // transmit the text stream
          const text = json.choices[0].delta?.content || '';
          const queue = encoder.encode(text);
          controller.enqueue(queue);

        } catch (e) {
          // maybe parse error
          controller.error(e);
        }
      });

      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any)
        parser.feed(decoder.decode(chunk));

    },
  });
}

export interface ApiInput {
  messages: UiMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}


export default async function handler(req: NextRequest) {

  // read inputs
  const { messages, model = 'gpt-4', temperature = 0.5, max_tokens = 2048 }: ApiInput = await req.json();
  const chatGptInputMessages: ChatGPTMessage[] = messages.map(({ role, text }) => ({
    role: role,
    content: text,
  }));

  const stream: ReadableStream = await OpenAIStream({
    model,
    messages: chatGptInputMessages,
    temperature,
    max_tokens,
  });

  return new Response(stream);
};

//noinspection JSUnusedGlobalSymbols
export const config = {
  runtime: 'edge',
};
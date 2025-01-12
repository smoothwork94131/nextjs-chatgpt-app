export const Languages = [
  "English",
  "Spanish"
]
export const MOBILE_LIMIT_WIDTH = 760;

export const USER_TIMES_LIMIT = 0;
export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const NO_ACCOUNT_TIMES = 20;
export const FREE_TIMES = 30;
export const PAID_TIMES = 500;

export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE || 'https://api.openai.com';
export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'https://api.openai.com';

export const MOBILE_SEACH_PREVIEW_LENGTH = 25;
export const DESKTOP_SEARCH_PREVIEW_LENGTH = 70;

export const SEARCH_HISTORY_LIMIT_COUNT = 10;

export const DEFAULT_TEMPERATURE =
  parseFloat(process.env.NEXT_PUBLIC_DEFAULT_TEMPERATURE || "1");

export const STRIPE_WEBHOOK_SECRET =
  process.env.STRIPE_WEBHOOK_SECRET || '';

export const OPENAI_API_TYPE =
  process.env.OPENAI_API_TYPE || 'openai';

export const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY || '';

export const OPENAI_API_VERSION =
  process.env.OPENAI_API_VERSION || '2023-03-15-preview';

export const OPENAI_API_MAXTOKEN = 500;

export const OPENAI_ORGANIZATION =
  process.env.OPENAI_ORGANIZATION || '';

export const OPENAI_MODELID =
  process.env.OPENAI_MODELID || "gpt-3.5-turbo-0301";

export const GOOGLE_CLIENT_EMAIL =
  process.env.GOOGLE_CLIENT_EMAIL || '';

export const GOOGLE_PRIVATE_KEY =
  process.env.GOOGLE_PRIVATE_KEY || '';

export const AZURE_DEPLOYMENT_ID =
  process.env.AZURE_DEPLOYMENT_ID || '';

export const NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || '';

export const NEXT_PUBLIC_SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  'You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.\nKnowledge cutoff: 2021-09\nCurrent date: {{Today}}';

export const STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY || '';

export const ROLE_GROUP = [
  // {
  //   "name": "Marketing",
  //   "utilities_group": [
  //     {
  //       "name": "Copywriting",
  //       "active": true,
  //       "utilities": [
  //         {
  //           "key": "Marketing_Copywriting_Translate",
  //           "name": "Translate",
  //           "type": "translate",
  //           "style": "",
  //           "active": true,
  //           "inputs": [
  //             {
  //               "name": "Language From",
  //               "type": "form",
  //               "style": "",
  //               "value": "English",
  //               "options": [
  //                 "English",
  //                 "Spanish"
  //               ],
  //               "component": "Select"
  //             },
  //             {
  //               "name": "convert icon",
  //               "type": "icon",
  //               "style": "text-gray-400 w-[30px]",
  //               "component": "IconArrowRight"
  //             },
  //             {
  //               "name": "Language From",
  //               "type": "form",
  //               "style": "form",
  //               "value": "Spanish",
  //               "options": [
  //                 "Spanish",
  //                 "English"
  //               ],
  //               "component": "Select"
  //             }
  //           ],
  //           "summary": "Enter text for translation",
  //           "input_align": "horizental",
  //           "user_prompt": "Please translate the following text from {0} to {1} :{2}",
  //           "system_prompt": "You are a helpful assistant that translates",
  //           "include_prompt_history": true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   "name": "Coding",
  //   "utilities_group": [
  //     {
  //       "name": "Web",
  //       "active": true,
  //       "utilities": [
  //         {
  //           "key": "Coding_Web_Javascript",
  //           "name": "Javascript",
  //           "style": "",
  //           "active": true,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "user_prompt": "Write a JavaScript function that implements {0}",
  //           "include_prompt_history": false
  //         },
  //         {
  //           "key": "Coding_Web_Css",
  //           "name": "Css",
  //           "style": "",
  //           "active": false,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         },
  //         {
  //           "key": "Coding_Web_Database",
  //           "name": "Database",
  //           "style": "",
  //           "active": false,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         }
  //       ]
  //     },
  //     {
  //       "name": "Java",
  //       "active": false,
  //       "utilities": [
  //         {
  //           "key": "Coding_Java_Spring boot",
  //           "name": "Spring boot",
  //           "type": "",
  //           "style": "",
  //           "active": false,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         },
  //         {
  //           "key": "Coding_Java_Interface",
  //           "name": "Interface",
  //           "type": "",
  //           "style": "",
  //           "active": false,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         },
  //         {
  //           "key": "Coding_Java_Android",
  //           "name": "Android",
  //           "type": "",
  //           "style": "",
  //           "active": false,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   "name": "Learning",
  //   "utilities_group": [
  //     {
  //       "name": "English",
  //       "active": true,
  //       "utilities": [
  //         {
  //           "key": "Learning_English_Base",
  //           "name": "Base",
  //           "type": "",
  //           "style": "",
  //           "active": true,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         },
  //         {
  //           "key": "Learning_English_Influenty",
  //           "name": "Influenty",
  //           "type": "",
  //           "style": "",
  //           "active": false,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         },
  //         {
  //           "key": "Learning_English_Native",
  //           "name": "Native",
  //           "type": "",
  //           "style": "",
  //           "active": false,
  //           "inputs": [],
  //           "summary": "",
  //           "input_align": "horizental",
  //           "include_prompt_history": true
  //         }
  //       ]
  //     }
  //   ]
  // }
]


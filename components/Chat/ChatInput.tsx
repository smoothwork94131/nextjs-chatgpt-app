import { 
    FC,
    KeyboardEvent,
    useState,
    MutableRefObject,
    useEffect
} from 'react';
import { Box, Flex, Image } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { Textarea } from '@mantine/core';
import { LoaderIcon } from 'react-hot-toast';
import { Conversation } from '@/types/chat';
interface Props {
    onSend: (message: string) =>void;
    textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
    messageIsStreaming: boolean;
    inputContent:string;    
    setInputContent: (content: string)=>void;
    selectedConversation: Conversation;
}
const ChatInput:FC<Props> = ({ onSend, textareaRef, messageIsStreaming,inputContent, setInputContent, selectedConversation}) => {
    const [textError, setTextError] = useState<string>();
    
    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = 'inherit';
            textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
            textareaRef.current.style.overflow = `${
            textareaRef?.current?.scrollHeight > 400 ? 'auto' : 'hidden'
          }`;
        }
      }, []);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputContent(value);
    };
    const handleKeyDown = (e: any) => {
        
        if(e.key == "Enter" && !e.shiftKey && !messageIsStreaming) {
            e.preventDefault();
            handleSend();
            setInputContent("")
        }
    };
    const handleSend = () => {
        if (!inputContent) {
            setTextError("Please enter a message");
            return;
        }
        setTextError("");
        onSend(inputContent);
    };
    
    return (
        <Flex
            justify="flex-start"
            gap="xs"
            align='center'
        >  
            <Image maw={30} radius="sd" src="icons/avatar_user.png" alt="chatgpt avatar" />
            <Textarea
                className='w-full'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autosize
                minRows={2}
                maxRows={4}
                rightSection={
                    <Box
                        pr={20}
                    >
                        {
                            messageIsStreaming?
                            <LoaderIcon style={{width: '20px', height: '20px'}}></LoaderIcon>:
                            <IconSend size="1rem" className="opacity-[0.5] display-block cursor-pointer" onClick={handleSend}/>
                        }
                    </Box>
                }
                value={inputContent}
                ref={textareaRef}
                error={textError}
                
            />
        </Flex>
    )
}

export default ChatInput;
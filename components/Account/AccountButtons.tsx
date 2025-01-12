import { 
    Group,
    Button, 
    Text,
    Popover,
    
} from "@mantine/core";


import { getUserTimes } from "@/utils/app/supabase-client";
import { useEffect, useState, FC, useContext } from "react";
import MyModal from "@/components/Account/Modal";
import {AuthenticationForm} from "@/components/Account/AuthenticationForm";
import Subscription from "@/components/Account/Subscription";   
import { Conversation } from "@/types/chat";
import { PAID_TIMES } from "@/utils/app/const";
import { useUser } from "@/utils/app/useUser";
import { useDisclosure } from '@mantine/hooks';
import OpenaiContext from '@/components/openai/openai.context';

interface Props {
    selectedConversation: Conversation,
    isMobile: boolean;
}

const AccountButtons:FC<Props> = ({selectedConversation, isMobile}) => {
    const {
        state: { 
            messageIsStreaming
        },
        handleSelectRole,
        dispatch: openaiDispatch
    } = useContext(OpenaiContext);

    // const [isSubscription , setSubscription ] = useState<boolean>(true);
    const [times, setTimes] = useState<number>(-1);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('signin');
    const [opened, { close, open }] = useDisclosure(false);
    const { user, isSubscriptionActive: isSubscription, isLoading } = useUser();
    
    useEffect(() => {
        
        const fetchData = async() => {
            const userTimes = await getUserTimes(user);
            setTimes(userTimes);
        }
        fetchData();

    }, [ messageIsStreaming, isSubscription, user] );
    
    useEffect(() => {
        if(modalType == "signup" && user) {
            setModalType('subscription');
            setIsModal(true);
        }
    },[user]);

    const closeModal = () => {
        setIsModal(false);
    }
    useEffect(() => {
        
    }, [modalType])

    const showModal = (type) => {
        setModalType(type);
        setIsModal(true);
    }

    return (
        isLoading?<></>:
        <Group>
            {
                !isSubscription && (times >= 0 && times < PAID_TIMES)?
                isMobile?
                
                <Popover width={190} position="bottom" withArrow shadow="md" opened={opened}>
                    <Popover.Target>
                        <Text onMouseEnter={open} onMouseLeave={close} size='lg' underline>
                            {times}
                        </Text>
                    </Popover.Target>
                    <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
                        <Text size="lg" >Prompts remaining</Text>
                    </Popover.Dropdown>
                </Popover>
                :
                <Text>
                    {
                        times
                    } prompts left
                </Text>:<></>    
            }
            {
                !isMobile?
                user?
                    !isSubscription?
                    <Group>
                        {
                            <Button variant="outline" size="xs" onClick={() => {showModal('upgrade')}}>
                                Upgrade
                            </Button>
                        }
                    </Group>:<></>
                :
                <Group>
                    <Button variant="outline" size="xs" onClick={() => {showModal('signin')}}>
                        Sign In
                    </Button>
                    <Button className='bg-sky-500/100 h-[2rem]' onClick={() => {
                        showModal('signup')
                    }}>
                        Create Account
                    </Button>
                </Group>:<></>
            }
            <MyModal
                size={modalType == 'signin' || modalType == 'signup'?'sm':'sm'}
                isModal={isModal}
                child={modalType == 'signin' || modalType == 'signup'? <AuthenticationForm modalType={modalType}  closeModal={closeModal}/>:<Subscription closeModal={closeModal} />}
                title=''
                closeModal={closeModal}
                withCloseButton={false}
            />
        </Group>
    )
}

export default AccountButtons;
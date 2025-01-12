/* eslint-disable jsx-a11y/alt-text */
import { Box, Flex, Group, Button, Text, AppShell, Header } from '@mantine/core';
import { MOBILE_LIMIT_WIDTH } from '@/utils/app/const';
import { useMediaQuery } from '@mantine/hooks';
import { FC } from "react";
import { supabase } from "@/utils/app/supabase-client";
import { useUser } from '@/utils/app/useUser';
import { useRouter } from 'next/router';
import { Image } from '@mantine/core';
import Link from "next/link";
import dynamic from 'next/dynamic';

// const AppShell = dynamic(() => import('@mantine/core').then((mod) => mod.AppShell), { ssr: true });
// const Header = dynamic(() => import('@mantine/core').then((mod) => mod.Header), { ssr: true });

interface Props {
    children: JSX.Element,
    childrenSize: string
}

const Layout: FC<Props> = ({ children, childrenSize }) => {
    const isMobile = useMediaQuery(`(max-width: ${MOBILE_LIMIT_WIDTH}px)`);
    const {user} = useUser();
    const router = useRouter();
    
    const sign = async() => {
        if(user) {
            await supabase.auth.signOut();
        }   
        router.replace('/user/signin');
    }
    return (
        <AppShell
            padding="md"
            header={
            <Header height={60} p="xs">   
                <Box
                    sx={(theme) => ({
                        width: isMobile ? '95%' : '70%',
                        margin: "auto"
                    })}
                >
                    <Flex
                        align='center'
                        justify='space-between'
                        sx={(theme) => ({
                            height: '40px',
                            lineHeight: '40px'
                        })}
                    >
                        <Group>
                            <Image
                                src='/favicon.ico'
                                maw={30}
                                onClick={() =>{router.push("/")}}
                                sx={(theme) => ({
                                    cursor: 'pointer'
                                })}
                            />
                                <Link href='/user/pricing'>
                                    <Text
                                        sx={(theme) => ({
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        })}
                                       
                                    >
                                        Pricing
                                    </Text>
                                </Link>
                                {
                                    user?
                                    <Link href='/user/account'>
                                        <Text
                                            sx={(theme) => ({
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                                
                                            })}
                                            

                                        >
                                            Account
                                        </Text>
                                    </Link>
                                    :
                                    <></>
                                }
                            <Text
                                sx={(theme) => ({
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                })}
                            >
                                {/* <Link href='/account'>Account</Link> */}
                            </Text>
                        </Group>
                        <Group>
                            {
                                user ?
                                <Button variant="outline" size="xs" onClick={()=>{sign()}}>
                                    Sign Out
                                </Button>:<></>
                           }

                        </Group>
                    </Flex>
                </Box>
            </Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
            <Box sx={(theme) => ({
                width: isMobile ? '95%' : childrenSize,
                margin: "auto"
            })}>
                {
                    children
                }
            </Box>
        </AppShell>
    )
}

export default Layout;
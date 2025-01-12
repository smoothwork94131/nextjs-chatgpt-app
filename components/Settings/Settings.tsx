import { FC, useContext, useEffect, useState } from 'react';
import { Flex, Menu, NavLink, Group } from '@mantine/core';
import { IconLogin, IconLogout, IconMoon, IconSearch, IconSettings, IconShoppingBag, IconSun, IconUser, IconWorld } from '@tabler/icons-react';

import HomeContext from 'state/index.context';
import { useUser } from '@/utils/app/useUser';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/app/supabase-client';
import MyModal from '@/components/Account/Modal';
import { AuthenticationForm } from '@/components/Account/AuthenticationForm';
import Subscription from '@/components/Account/Subscription';

interface Props {
    isMobile: boolean;
    updateServerRoleData: () => void;
    changeSpotlightType: (type:string)=>void;
}
const Settings: FC<Props> = ({ isMobile, updateServerRoleData, changeSpotlightType }) => {

    
    const { user, isSubscriptionActive: isSubscription, isLoading } = useUser();
    const [isModal, setIsModal] = useState(false);
    const [modalType, setModalType] = useState('signin');
    const router = useRouter();

    const {
        state: { colorScheme, lightMode },
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    const closeModal = () => {
        setIsModal(false);
    }

    useEffect(()=> {
        
        if(modalType == "signup" && user) {
            setModalType('subscription');
            setIsModal(true);
        }
    }, [user])

    const handleColorScheme = () => {
        homeDispatch({
            field: "colorScheme",
            value: colorScheme == 'dark' ? 'light' : 'dark'
        });
        homeDispatch({
            field: "lightMode",
            value: lightMode == 'dark' ? 'light' : 'dark'
        });
        localStorage.setItem("colorScheme", colorScheme == 'dark' ? 'light' : 'dark');
    }

    const goLogin = async () => {
        if (user) {
            await supabase.auth.signOut();
        } else {
            setModalType("signin");
            setIsModal(true);
        }
    }

    const signUp = () => {
        setModalType("signup");
        setIsModal(true);
    }

    const goPortalPage = async () => {
        if (user) {
            router.push('/user/account');
        } else {
            setModalType("signin");
            setIsModal(true);
        }
    }
    
    const upgrade = () => {
        setModalType("upgrade");
        setIsModal(true);
    }

    return (
        isLoading ? <div></div> :
        <Group>
            {
                isMobile ?
                    <Menu.Dropdown>
                        <Menu.Item
                            icon={
                                colorScheme == "dark" ? <IconSun size={14} /> : <IconMoon size={14} />
                            }
                            onClick={handleColorScheme}
                        >
                            {colorScheme == "dark" ? "Light" : "Dark"}
                        </Menu.Item>
                        <Menu.Item
                            icon={<IconSearch size={14} />}
                            onClick={() => {changeSpotlightType('history')}}
                        >
                            Search History
                        </Menu.Item>
                        <Menu.Item
                            icon={<IconSearch size={14} />}
                            onClick={() => {changeSpotlightType('utility')}}
                        >
                            Search Utility
                        </Menu.Item>
                        <Menu.Item
                            icon={<IconWorld size={14} />}
                            onClick={() => { updateServerRoleData() }}
                        >
                            Updates & FAQ
                        </Menu.Item>
                        {
                            user?
                            <Menu.Item
                                icon={<IconShoppingBag size={14} />}
                                onClick={() => { goPortalPage() }}
                            >
                                Account
                            </Menu.Item>
                            :<></>    
                        }
                        
                        {
                            user && !isSubscription?
                            <Menu.Item
                                icon={<IconSettings size={14} />}
                                onClick={() => { upgrade() }}
                            >
                                Upgrade
                            </Menu.Item>:<></>
                        }
                        
                        <Menu.Item
                            icon={user ? <IconLogout size={14} /> : <IconLogin size={14} />}
                            onClick={() => goLogin()}
                        >
                            {
                                user ? 'Sign out' : 'Sign in'
                            }
                        </Menu.Item>
                        {
                            !user?
                            <Menu.Item
                                icon={<IconUser size={14} />}
                                onClick={() => signUp()}
                            >
                                Create Account
                            </Menu.Item>:<></>
                        }
                    </Menu.Dropdown> :
                    <Flex
                        mih={50}
                        justify="flex-start"
                        align="flex-start"
                        direction="column"
                        wrap="wrap"
                        sx={(theme) => ({
                            borderTop: `1px solid ${theme.colorScheme == 'dark' ? theme.colors.gray[8] : theme.colors.gray[1]}`,
                            paddingTop: theme.spacing.md,
                            width: '100%'
                        })}
                    >
                        <NavLink
                            label={`${colorScheme == "dark" ? "Light" : "Dark"}`}
                            icon={colorScheme == "dark" ? <IconSun size="1rem" stroke={1.5} /> : <IconMoon size="1rem" stroke={1.5} />}
                            variant="subtle"
                            onClick={handleColorScheme}
                        />
                        <NavLink
                            label="Search History"
                            icon={<IconSearch size="1rem" stroke={1.5} />}
                            variant="subtle"
                            onClick={() => { changeSpotlightType('history') }}
                        />
                        <NavLink
                            label="Search Utility"
                            icon={<IconSearch size="1rem" stroke={1.5} />}
                            variant="subtle"
                            onClick={() => { changeSpotlightType('utility') }}
                        />
                        <NavLink
                            label="Updates & FAQ"
                            icon={<IconWorld size="1rem" stroke={1.5} />}
                            variant="subtle"
                            onClick={() => { updateServerRoleData() }}
                        />
                        {
                            user?
                            <NavLink
                                label="Account"
                                icon={<IconShoppingBag size="1rem" stroke={1.5} />}
                                variant="subtle"
                                onClick={() => { goPortalPage() }}
                            />:<></>
                        }
                        {
                            user && !isSubscription?
                            <NavLink
                                label="Upgrade  "
                                icon={<IconSettings size="1rem" stroke={1.5} />}
                                variant="subtle"
                                onClick={() => {upgrade() }}
                            />:<></>
                        }
                        
                        <NavLink
                            label={
                                user ? 'Sign out' : 'Sign in'
                            }
                            icon={user ? <IconLogout size="1rem" stroke={1.5} /> : <IconLogin size="1rem" stroke={1.5} />}
                            variant="subtle"
                            onClick={() => goLogin()}
                        />
                        {
                            !user?
                            <NavLink
                                label='Create Account'
                                icon={user ? <IconUser size="1rem" stroke={1.5} /> : <IconUser size="1rem" stroke={1.5} />}
                                variant="subtle"
                                onClick={() => signUp()}
                            />:<></>
                        }
                    </Flex>
            }

            <MyModal
                size={modalType == 'signin' || modalType == 'signup'?'sm':'sm'}
                isModal={isModal}
                child={modalType == 'signin' || modalType == 'signup'? <AuthenticationForm modalType={modalType} closeModal={closeModal}/>:<Subscription closeModal={closeModal}/>}
                title=''
                closeModal={closeModal}
                withCloseButton={false}
            />
        </Group>
    )
}

export default Settings;

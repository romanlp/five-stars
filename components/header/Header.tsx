import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from "../../lib/firebase.auth";
import LoginModal from '../login-modal/LoginModal';
import styles from './Header.module.css';


export default function Header() {
    const { user, signout } = useAuth();

    const [opened, toggleOpened] = useDisclosure(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);



    return <header className={styles.header}>Five Stars
        <nav className={styles.navitem}>
            <Link href="/">Home</Link>

            {user ?
                <Menu
                    size={260}
                    placement="end"
                    transition="pop-top-right"
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                    control={
                        <UnstyledButton>
                            <Group spacing={7}>
                                <Avatar src={user.photoUrl} alt={user.email} radius="xl" size={25} />
                                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3} color="#f57e7e">
                                    {user.email}
                                </Text>
                            </Group>
                        </UnstyledButton>
                    }
                >
                    <Menu.Item onClick={() => signout()}>
                        Log out
                    </Menu.Item>
                </Menu>
                :
                <LoginModal />
            }
        </nav>
    </header>
}

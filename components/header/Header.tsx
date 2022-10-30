import {Avatar, Group, Menu, Text, UnstyledButton} from '@mantine/core';
import Link from 'next/link';
import {useAuth} from "../../lib/firebase.auth";
import LoginModal from '../login-modal/LoginModal';
import styles from './Header.module.css';


export default function Header() {
    const {user, signout} = useAuth();


    return <header className={styles.header}>Five Stars
        <nav className={styles.navitem}>
            <Link href="/">Home</Link>

            {user ?
                <Menu
                    width={260}
                    transition="pop-top-right"
                >
                    <Menu.Target>
                        <UnstyledButton>
                            <Group spacing={7}>
                                <Avatar src={user.photoUrl} alt={user.email} radius="xl" size={25}/>
                                <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3} color="#f57e7e">
                                    {user.email}
                                </Text>
                            </Group>
                        </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item onClick={() => signout()}>
                            Log out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                :
                <LoginModal/>
            }
        </nav>
    </header>
}

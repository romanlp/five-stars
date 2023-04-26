import { ActionIcon, Avatar, Group, Menu, Text, UnstyledButton, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import Link from 'next/link';
import { useAuth } from "../../lib/firebase.auth";
import LoginModal from '../login-modal/LoginModal';
import styles from './Header.module.css';


export default function Header() {
  const { user, signout } = useAuth();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return <header className={styles.header}>Five Stars
    <nav className={styles.navitem}>
      <Link href="/">Home</Link>

      {user ?
        <Menu
          width={260}
          transitionProps={{ transition: "scale-y", duration: 75 }}
        >
          <Menu.Target>
            <UnstyledButton>
              <Group spacing={7}>
                <Avatar src={user.photoUrl} alt={user.email} radius="xl" size={25}/>
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3} color="#f57e7e">
                  {user.email}
                </Text>
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Link href="/ratings">
              <Menu.Item>My ratings</Menu.Item>
            </Link>
            <Link href="/watchlist">
              <Menu.Item>Watchlist</Menu.Item>
            </Link>
            <Menu.Divider/>
            <Menu.Item onClick={() => signout()}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        :
        <LoginModal/>
      }
      <ActionIcon
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {dark ? <IconSun size="1.1rem"/> : <IconMoonStars size="1.1rem"/>}
      </ActionIcon>
    </nav>
  </header>
}

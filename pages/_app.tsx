import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useColorScheme } from "@mantine/hooks";
import { AppProps } from 'next/app';
import { useState } from "react";
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { AuthProvider } from '../lib/firebase.auth';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >

          <AuthProvider>

            <AppShell
              padding="md"
              header={<Header/>}
              footer={<Footer/>}
            >
              <Component {...pageProps} />
            </AppShell>
          </AuthProvider>

        </MantineProvider>
      </ColorSchemeProvider>

    </>
  );
}

export default MyApp

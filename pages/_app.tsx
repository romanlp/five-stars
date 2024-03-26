import { AppShell, MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import { AuthProvider } from '../lib/firebase.auth';
import '../styles/globals.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider defaultColorScheme="auto">

        <AuthProvider>
          <AppShell padding="md">
            <AppShell.Header>
              <Header/>
            </AppShell.Header>

            <Component {...pageProps} />

            <AppShell.Footer>
              <Footer/>
            </AppShell.Footer>
          </AppShell>
        </AuthProvider>

      </MantineProvider>
    </>
  );
}

export default MyApp

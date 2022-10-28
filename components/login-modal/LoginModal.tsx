import { Button, Divider, Group, Modal, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useAuth } from '../../lib/firebase.auth';

export default function LoginModal() {
    const [opened, setOpened] = useState(false);

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (val) => /^\S+@\S+$/.test(val),
            password: (val) => val.length >= 6,
        },


    });

    const auth = useAuth();

    const handleSignIn = async ({ email, password }) => {
        auth.signinWithEmail(email, password);
    }
    const handleSignInGoogle = async () => {
        auth.signinWithGoogle();
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Login to five stars"
            >

                <Group grow mb="md" mt="md">
                    <Button color="red" onClick={handleSignInGoogle}>Sign in with google</Button>
                </Group>

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(handleSignIn)}>
                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email && 'Invalid email'}
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                        error={form.errors.password && 'Password should include at least 6 characters'}
                    />

                    <Group grow mb="md" mt="md">
                        <Button type="submit">Log in</Button>
                    </Group>
                </form>
            </Modal>


            <Button color="pink" onClick={() => setOpened(true)}>Login</Button>

        </>
    );
}

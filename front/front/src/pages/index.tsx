import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { FormHandles } from "@unform/core";
import TextInput from "../components/TextInput";
import { Container, Form } from "../styles/pages/SignIn";
import { useAuth } from "../hooks/useAuth";

interface SignInData {
  username: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
  const { user, signIn } = useAuth();

  const [signInError, setSignInError] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        await signIn(data);

        router.push("/chat");
      } catch (err) {
        console.log(err);
        setSignInError(true);
      }
    },
    [signIn]
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Login to start chatting</h1>

        {signInError && <p>username and password don't match</p>}

        <div>
          <TextInput name="username" label="Username" />
          <TextInput name="password" label="Password" type="password" />

          <button type="submit">Log In</button>
        </div>

        <span>
          Don't have an account? <Link href="/signup">Sign Up Now!</Link>
        </span>
      </Form>
    </Container>
  );
}

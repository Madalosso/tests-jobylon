import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { FormHandles } from "@unform/core";
import TextInput from "../components/TextInput";
import { Container, Form } from "../styles/pages/SignUp";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export default function SingUp() {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const [signInError, setSignInError] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      try {
        await api.post("api/users/", data);

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

        {signInError && <p>error creating account</p>}

        <div>
          <TextInput name="first_name" label="First Name" />
          <TextInput name="last_name" label="Last name" />
          <TextInput name="email" label="E-mail" type="email" />
          <TextInput name="username" label="Username" />
          <TextInput name="password" label="Password" type="password" />

          <button type="submit">Create Account</button>
        </div>

        <span>
          Already have an account? <Link href="/">Sign In!</Link>
        </span>
      </Form>
    </Container>
  );
}

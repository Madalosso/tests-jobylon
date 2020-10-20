import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useFetch } from "../hooks/useFetch";
import { VscSignOut } from "react-icons/vsc";
import { BiSend } from "react-icons/bi";
import { animateScroll } from "react-scroll";

import UserButton from "../components/UserButton";
import MessageList from "../components/MessageList";
import TextInput from "../components/TextInput";
import {
  Container,
  UserListWrapper,
  UserList,
  Thread,
  Conversation,
  NoMessages,
  SendMessageContainer,
} from "../styles/pages/Chat";
import { useAuth } from "../hooks/useAuth";
import { FormHandles } from "@unform/core";
import api from "../services/api";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IMessage {
  id: number;
  content: string;
  created_by: number;
  created: string;
}

export interface IThread {
  id: number;
  participants: [];
}

export default function Chat() {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { user: loggedUser, signOut } = useAuth();
  const [userSelected, setUserSelected] = useState<IUser | undefined>(
    undefined
  );

  const { data: users } = useFetch<IUser[]>("/api/users/");

  const handleUserSelect = useCallback(
    async (user) => {
      if (userSelected?.id !== user.id) {
        formRef.current?.setFieldValue("content", "");
      }

      setUserSelected(user);
    },
    [userSelected, formRef.current]
  );

  const handleSendMessage = useCallback(
    async (data: { content: string }) => {
      await api.post("/api/messages/", {
        content: data.content,
        created_by_id: loggedUser.id,
        sent_to: [userSelected?.id],
      });

      formRef.current?.reset();
    },
    [loggedUser, userSelected]
  );

  const handleSignOut = useCallback(() => {
    try {
      signOut();
      router.push("/");
    } catch (err) {
      console.log(signOut);
    }
  }, [signOut]);

  if (!users) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <UserListWrapper>
        <button type="button" onClick={handleSignOut}>
          <VscSignOut size={24} />
        </button>
        <UserList>
          {users.map(
            (user) =>
              loggedUser.id !== user.id && (
                <UserButton
                  key={user.id}
                  isSelected={user.id === userSelected?.id}
                  onClick={() => handleUserSelect(user)}
                >
                  {`${user.first_name} ${user.last_name}`}
                </UserButton>
              )
          )}
        </UserList>
      </UserListWrapper>

      <Thread>
        {userSelected ? (
          <>
            <Conversation id="conversation">
              <div>
                <h1>Conversation with {userSelected.first_name}</h1>
                <MessageList user={userSelected} />
              </div>
            </Conversation>
            <SendMessageContainer ref={formRef} onSubmit={handleSendMessage}>
              <TextInput name="content" />
              <button type="submit">
                <BiSend size={32} />
              </button>
            </SendMessageContainer>
          </>
        ) : (
          <NoMessages>Select a user on the left to start a thread!</NoMessages>
        )}
      </Thread>
    </Container>
  );
}

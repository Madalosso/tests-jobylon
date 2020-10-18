import { useCallback, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import UserButton from "../components/UserButton";
import MessageList from "../components/MessageList";
import {
  Container,
  UserList,
  Thread,
  Conversation,
  TextBox,
  NoMessages,
} from "../styles/pages/Home";
import api from "../services/api";

const loggedUser = 6;

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

export default function Home() {
  const [userSelected, setUserSelected] = useState<IUser | undefined>(
    undefined
  );
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { data: users } = useFetch<IUser[]>("/api/users/");

  const handleUserSelect = useCallback(async (user) => {
    setUserSelected(user);
    const response = await api.get(
      `/api/messages/?participants=${user.id}&participants=${loggedUser}`
    );

    setMessages(response.data);
  }, []);

  if (!users) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      <UserList>
        {users.map((user) => (
          <UserButton
            key={user.id}
            isSelected={user.id === userSelected?.id}
            onClick={() => handleUserSelect(user)}
          >
            {`${user.first_name} ${user.last_name}`}
          </UserButton>
        ))}
      </UserList>
      <Thread>
        {userSelected ? (
          <>
            <Conversation>
              <div>
                <h1>Conversation with {userSelected.first_name}</h1>
                <MessageList user={userSelected} />
              </div>
            </Conversation>
            <TextBox />
          </>
        ) : (
          <NoMessages>Select a user on the left to start a thread!</NoMessages>
        )}
      </Thread>
    </Container>
  );
}

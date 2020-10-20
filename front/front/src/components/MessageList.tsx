import { IUser, IMessage } from "../pages/chat";
import { useFetch } from "../hooks/useFetch";
import { Container, Message } from "../styles/components/MessageList";
import { useAuth } from "../hooks/useAuth";

interface IMessageListProps {
  user: IUser;
}

export default function MessageList({ user }: IMessageListProps) {
  const { user: loggedUser } = useAuth();

  const { data: messages } = useFetch<IMessage[]>(
    `/api/messages/?participants=${user.id}&participants=${loggedUser.id}`
  );

  if (!messages) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      {messages.map((message) => (
        <Message
          fromLoggedUser={message.created_by === loggedUser.id}
          key={message.id}
        >
          <div>
            <p>{message.content}</p>
            <small>{message.created}</small>
          </div>
        </Message>
      ))}
    </Container>
  );
}

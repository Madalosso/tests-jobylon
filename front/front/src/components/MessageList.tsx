import { IUser, IMessage } from "../pages/index";
import { useFetch } from "../hooks/useFetch";
import { Container, Message } from "../styles/components/MessageList";

const loggedUser = 6;

interface IMessageListProps {
  user: IUser;
}

export default function MessageList({ user }: IMessageListProps) {
  const { data: messages } = useFetch<IMessage[]>(
    `/api/messages/?participants=${user.id}&participants=${loggedUser}`
  );

  if (!messages) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      {messages.map((message) => (
        <Message
          fromLoggedUser={message.created_by === loggedUser}
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

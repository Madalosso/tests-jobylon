import { ButtonHTMLAttributes } from "react";
import { IUser } from "../pages/chat";
import { Container } from "../styles/components/UserButton";

interface IUserButtonProps {
  isSelected: boolean;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & IUserButtonProps;

export default function UserButton({
  isSelected,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Container isSelected={isSelected} {...rest}>
      {children}
    </Container>
  );
}

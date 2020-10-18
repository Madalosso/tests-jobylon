import styled from "styled-components";

interface IContainerProps {
  isSelected: boolean;
}

export const Container = styled.button<IContainerProps>`
  color: #4dd06e;
  font-weight: bold;
  border: 0;
  border-top: 1px solid #6a6577;
  border-bottom: 1px solid #6a6577;
  padding: 8px;
  outline: none;
  cursor: pointer;

  background: ${(props) => (props.isSelected ? "#383A59" : "inherit")};
`;

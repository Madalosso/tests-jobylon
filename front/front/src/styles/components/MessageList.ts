import styled, { css } from "styled-components";

interface IMessageProps {
  fromLoggedUser?: boolean;
}

export const Container = styled.div`
  div {
    margin: 4px 4px;
  }
`;

export const Message = styled.div<IMessageProps>`
  font-size: 14px;

  display: flex;

  ${(props) =>
    props.fromLoggedUser &&
    css`
      justify-content: flex-end;
    `}

  div {
    border: 1px solid #aa99ff;
    border-radius: 8px;
    padding: 4px 12px;
    max-width: 300px;
    word-wrap: break-word;
    white-space: normal;

    small {
      color: #6a6577;

      ${(props) =>
        props.fromLoggedUser &&
        css`
          float: right;
        `};
    }
  }
`;

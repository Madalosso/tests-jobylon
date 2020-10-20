import styled from "styled-components";
import { Form as Unform } from "@unform/web";

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const UserListWrapper = styled.div`
  border-right: 1px solid #6a6577;

  display: flex;
  flex-direction: column;
  flex: 1;

  > button {
    max-width: 32px;
    border: 0;
    padding: 4px;
    background: inherit;

    display: flex;
    cursor: pointer;

    svg {
      color: #aa99ff;
    }
  }
`;

export const UserList = styled.ul`
  display: flex;
  flex-direction: column;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #282a36;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #aa99ff;
    border-radius: 16px;
  }

  button + button {
    margin-top: 8px;
  }
`;

export const Thread = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;

export const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #282a36;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #aa99ff;
    border-radius: 16px;
  }

  > div {
    flex: 2;

    h1 {
      padding: 10px;
      border-bottom: 1px solid #6a6577;
      text-align: center;
    }
  }
`;

export const TextBox = styled.input`
  background: #383a59;
  height: 32px;
  border-radius: 16px;
  outline: none;
  padding: 0 12px;
  word-wrap: break-word;
`;

export const NoMessages = styled.div`
  font-weight: bold;
  margin: auto;
`;

export const SendMessageContainer = styled(Unform)`
  padding-top: 8px;

  display: flex;
  align-items: center;

  > div {
    width: 100%;
  }

  input {
    background: #383a59;
    height: 32px;
    border-radius: 16px;
    outline: none;
    padding: 0 12px;
    word-wrap: break-word;
    color: #fff;
  }

  button {
    cursor: pointer;
    background: inherit;
    border: 0;
    color: #4dd06e;
    outline: none;
  }
`;

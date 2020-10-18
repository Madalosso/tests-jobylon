import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
`;

export const UserList = styled.ul`
  background: #282a36;
  border-right: 1px solid #6a6577;

  display: flex;
  flex-direction: column;
  flex: 1;

  button + button {
    margin-top: 8px;
  }
`;

export const Thread = styled.section`
  background: #282a36;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 2;
`;

export const Conversation = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  div {
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

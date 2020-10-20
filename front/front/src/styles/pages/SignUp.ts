import styled from "styled-components";
import { Form as Unform } from "@unform/web";

export const Container = styled.div`
  height: 100vh;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled(Unform)`
  width: 30vw;
  border: 1px solid #6a6577;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    padding: 8px 0;
    color: #aa99ff;
    border-bottom: 1px solid #6a6577;
    text-align: center;
    margin-bottom: 8px;
  }

  > div {
    margin: auto;
    padding: 12px 0;

    input {
      color: #fff;
      background: #383a59;
      height: 24px;
      border-radius: 16px;
      outline: none;
      padding: 0 12px;
    }

    button {
      color: #4dd06e;
      margin-top: 12px;
      background: inherit;
      font-weight: bold;
      border: 0;
      border: 2px solid #6a6577;
      border-radius: 16px;
      padding: 4px 12px;
      outline: none;
    }
  }

  p {
    text-align: center;
    color: #fc5555;
    font-weight: bold;
  }

  div + div {
    margin-top: 12px;
  }

  span {
    text-align: center;
    border-top: 1px solid #6a6577;
    padding: 8px 0;
  }
`;

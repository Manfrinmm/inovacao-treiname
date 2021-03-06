import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  select {
    margin-top: 4px;
    padding: 8px 16px;
    border: 1px solid;
    border-radius: 8px;

    &::placeholder {
      opacity: 0.4;
    }
  }
`;

export const Error = styled.span`
  color: #ed4337;
  margin-top: 4px;
  font-weight: 500;
`;

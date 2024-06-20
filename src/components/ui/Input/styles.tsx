import styled from "styled-components";

export interface IInputContainerProps {
  wd?: string;
  hg?: string;
  bd?: string;
}

export const InputBorder = styled.div<IInputContainerProps>`
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "30px")};
  border: ${(props) => (props.bd ? props.bd : "1.5px solid #fff;")};

  border-radius: 0.3rem;
  padding: 1px 3px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  background-color: #383c4c;

  input {
    color: #fff;
    font-size: .8rem;
  }
`;

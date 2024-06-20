import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  min-height: 88vh;

  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  background-color: #191e28;
`;

export interface IFormContainerProps {
  wd?: string;
  hg?: string;
}
export const FormContainer = styled.div<IFormContainerProps>`
  width: ${(props) => (props.wd ? props.wd : "auto")};

  border-radius: 20px;
  
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  background-color: #000000;
`;

export interface ITitleBarProps {
  wd?: string;
  hg?: string;
}
export const TitleBar = styled.div<ITitleBarProps>`
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "10vh")};
  margin-top: 10px;

  background-color: #191e28;
  //background-color: Green;

  h1 {
    margin-left: 30px;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
  }
  h2 {
    margin-left: 30px;
    font-size: 15px;
    font-weight: normal;
    color: #fff;
  }
`;

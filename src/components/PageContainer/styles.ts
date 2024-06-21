import styled from "styled-components";

interface IContainerProps {
  bc?: string;
 }

export const Container = styled.div<IContainerProps>`
  width: auto;
  min-height: 88vh;

  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => (props.bc ? props.bc : "#191e28")};
`;

interface IFormContainerProps {
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
  //background-color: yellow;
`;

interface ITitleBarProps {
  wdt?: string;
  hgt?: string;
}
export const TitleBar = styled.div<ITitleBarProps>`
  width: ${(props) => (props.wdt ? props.wdt : "10vh")};
  height: ${(props) => (props.hgt ? props.hgt : "10vh")};

  background-color: #191e28;
  //background-color: Green;

  h1 {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
  }
  h2 {
    margin-left: 10px;
    font-size: 15px;
    font-weight: normal;
    color: #fff;
  }
`;

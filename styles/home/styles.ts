import styled from 'styled-components';

export const Form = styled.div`
  width: 99%;
 `;

interface IContainerHomeProps {
  wd?: string;
  hg?: string;
  bc?: string;
 }
export const ContainerHome = styled.div<IContainerHomeProps>`
  width: ${(props) => (props.wd ? props.wd : "40vh")};
  height: ${(props) => (props.hg ? props.hg : "10vh")};
  background-color:  ${(props) => (props.bc ? props.bc : "#fff")};

  margin-bottom: 25px;

  border-radius: 12px;
  display: flex;
  flex-flow: column wrap;

  label {
    margin-top: 10px;
    font-size: 18px;
    font-weight: normal;
    margin-right: 10px;
    margin-left: 1px;
    color: #fff;
  }
`;

export const GridContainer = styled.div`
  width: 100%;
  margin-top: 1px;
  padding-right: 5px;
  height: 100%;
  
  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
 `;

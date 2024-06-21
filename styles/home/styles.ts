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

  margin-left: 15px;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 10px;

  border-radius: 10px;

  display: flex;
  flex-flow: column wrap;

  label {
    font-size: 17px;
    font-weight: normal;
    margin-top: 5px;
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

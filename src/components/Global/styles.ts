import styled from "styled-components";
import PerfectScrollbar from 'react-perfect-scrollbar';


interface DivRowProps {
  wd?: string | any;
  hg?: string;
  pd?: string;
  bc?: string;
}
export const DivRow = styled.div<DivRowProps>`
  width: 100%;
  height: ${(props) => (props.hg ? props.hg : "auto")};
  padding: ${(props) => (props.pd ? props.pd : "auto")};
  
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

interface DivColProps {
  wd?: string;
  hg?: string;
  align?: string;
  mg?: string;
  pd?: string;
  bdr?: string;
  bc?: string;
}
export const DivCol = styled.div<DivColProps>`
  width: ${(props) => (props.wd ? props.wd : "100%")};
  padding: ${(props) => (props.pd ? props.pd : "auto")};
`;

interface AreaCompProps {
  wd?: string;
  hg?: string;
  ml?: string;

  algItem?: string;
  justCont?: string;
  flexDirect?: string;

  mgTop?: string;
  inputAlg?: string;
  inputSize?: string;
  bc?: string;
}

export const AreaComp = styled.div<AreaCompProps>`
  width: ${(props) => (props.wd ? props.wd : "100%")};
  height: ${(props) => (props.hg ? props.hg : "40%")};
  margin-left: ${(props) => (props.ml ? props.ml : "10px")};
  margin-top: ${(props) => (props.mgTop ? props.mgTop : "0px")};
  padding: 5px;

  display: flex;
  flex-direction: ${(props) => (props.flexDirect ? props.flexDirect : "column")};
  justify-content:  ${(props) => (props.justCont ? props.justCont : "center")};
  align-items: ${(props) => (props.algItem ? props.algItem : "flex-start")};

  input {
    width: ${(props) => (props.inputSize ? props.inputSize : "10vh")};
    text-align: ${(props) => (props.inputAlg ? props.inputAlg : "left")};
    height: 20px;

    background: transparent;
    border-radius: 0.4rem;
    border: 0;
    padding: 1px;
  }
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
  
  select {
    width: 100%;
    height: 28px;
    padding: 0 0.5rem;

    color: #fff;
    background-color: #383e4c;
    font-size: 13px;

    border-radius: 0.2rem;
    border: 1px solid #fff;
  }

  label {
    font-weight: normal;
    margin-right: 10px;
    margin-left: 1px;
    color: #fff;
  }

  h1 {
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    color: #fff;
  }

  h2 {
    width: 100%;
    text-align: center;
    display: block;
    font-size: 16px;
    color: #fff;
  }

  h3 {
    width: 100%;
    font-size: 30px;
    color: #fff;
  }

  //border: 1px solid #000000;
`;

export const Divider = styled.div`
  width: 95%;
  height: 1px;

  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 30px;

  padding: 1px;

  background: #383c4c;
`;


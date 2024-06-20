import styled from "styled-components";

export interface IButtonProps {
  wd?: string;
  hg?: string;
  bg?: string;
  ml?: string;
  cl?: string;
}

export const ButtonContainer = styled.div<IButtonProps>`
  width: ${(props) => (props.wd ? props.wd : "auto")};
  height: ${(props) => (props.hg ? props.hg : "10px")};
  background-color: ${(props) => (props.bg ? props.bg : "#fff")};
  margin-left: ${(props) => (props.ml ? props.ml : "0px")};
  margin-right: 15px;

  border: 1px solid #fff;
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  // animação do botão
  &[disabled] {
    cursor: not-allowed;
    svg {
      animation: animate 2s infinite;
    }
  }
  
/*
  // Colorir botão
  background: -webkit-linear-gradient(to left, #21d4fd, #b721ff);
  background: -o-linear-gradient(to left, #21d4fd, #b721ff);
  background: -moz-linear-gradient(to left, #21d4fd, #b721ff);
  background: linear-gradient(to left, #21d4fd, #b721ff);
*/

  &:hover {
    filter: brightness(1.5);
  }

  button {
    background: transparent;
    border: 0;
    font-weight: bolder;
    color: ${(props) => (props.cl ? props.cl : "#000000")};
    font-size: 1.2rem;
  }

  @keyframes animate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';

export const Container = styled.div`
  width: 99.9%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  //background-color: #FFF5EE;
  background-color: yellow;
  background-color: #000000;
`;

export const ContainerLogo = styled.div`
  width: auto;
  margin-left: 1px;

`;

export const ContainerLogin = styled.div`
  width: 30%;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    background: transparent;
    border: 0;
  }
`;

export const Text = styled.a`
  margin-top: .5rem;
  font-weight: bold;
  cursor: pointer;

  color: #FF0000;

  @media ${device.mobileS} {
    font-size: 45%;
  }
  @media ${device.tablet} {
    font-size: 50%;
  }
  @media ${device.tabletL} {
    font-size: 65%;
  }
  @media ${device.laptop} {
    font-size: 75%;
  }
  @media ${device.laptopM} {
    font-size: 90%;
  }
  @media ${device.laptopL} {
    font-size: 100%;
  }
  @media ${device.desktop} {
    font-size: 100%;
  }
  @media ${device.desktopL} {
    font-size: 100%;
  }
`


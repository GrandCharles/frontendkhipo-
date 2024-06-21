import styled from 'styled-components';

export const Form = styled.form`
  width: 90%;
  margin-top: 15px;

  border-radius: 15px;
  background-color: #000000;
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

export const ButtonGrid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1px;

  button {
    background: transparent;
    border: 0;

    &:hover {
    filter: brightness(2);
  }
 }
`

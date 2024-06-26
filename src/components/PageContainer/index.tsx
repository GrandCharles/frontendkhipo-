import { ReactNode} from "react";
import { Container, TitleBar, FormContainer } from "./styles";

type PageContainerProps = {
  titulo?: string;
  titulo2?: string;
  wd?: string;
  hg?: string;
  wdt?: string;
  hgt?: string;
  ml?: string;
  bc?: string;
  children: ReactNode;
};

export function PageContainer({
  titulo,
  titulo2,
  wd,
  hg,
  wdt,
  hgt,
  bc,
  children,  
}: PageContainerProps) {
  return (
    <>
      <Container bc={bc}>

        <TitleBar wdt={wdt} hgt={hgt}>
          <h1>{titulo}</h1>
          <h2>{titulo2}</h2>
        </TitleBar>

        <FormContainer wd={wd} >
          {children}
        </FormContainer>
      </Container>
    </>
  );
}

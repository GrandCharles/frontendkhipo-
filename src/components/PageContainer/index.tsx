import { ReactNode, ButtonHTMLAttributes, useRef, useState } from "react";
import { ImExit } from "react-icons/im";
import Link from "next/link";
import { Container, TitleBar, FormContainer } from "./styles";

type PageContainerProps = {
  titulo?: string;
  titulo2?: string;
  sair: boolean;
  wd?: string;
  hg?: string;
  ml?: string;
  children: ReactNode;
};

export function PageContainer({
  titulo,
  titulo2,
  sair,
  wd,
  hg,
  children,
}: PageContainerProps) {
  return (
    <>
      <Container>

        <TitleBar wd={wd} hg={hg}>
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

import { ReactNode, ButtonHTMLAttributes, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { ButtonContainer } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
  wd?: string;
  hg?: string;
  bg?: string;
  ml?: string;
  cl?: string;
}

export function Button({ loading, children, wd, hg, bg, ml, cl, ...rest}: ButtonProps) {
  return (
    
    <ButtonContainer wd={wd} hg={hg} bg={bg} ml={ml} cl={cl}>

      <button disabled={loading}  {...rest}>
        {loading ? (
          <FaSpinner color="#FFF" size={16} />
        ) : (
          <a>{children}</a>
        )}
      </button>
      
    </ButtonContainer>
  );
}


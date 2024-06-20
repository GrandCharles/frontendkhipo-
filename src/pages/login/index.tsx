import { useContext, FormEvent, useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { AreaComp } from "../../components/Global/styles";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { canSSRGuest } from "../../utils/canSSRGuest";

import { Container, ContainerLogo, ContainerLogin, Text } from "./styles";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("usuario@gmail.com");
  const [senha, setSenha] = useState("123");
  const [loading, setLoading] = useState(false);

  async function logar(event: FormEvent) {
    // evitar recarregamento da pagina
    event.preventDefault();

    if (email === "" || senha === "") {
      toast.warning("Email e senha devem ser informados!");
      return;
    }

    setLoading(true);
    await signIn({ email, senha });
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu Login</title>
      </Head>

      <Container>
        <ContainerLogo>
          <img src="logoKhipo.jpg" />
        </ContainerLogo>

        <ContainerLogin>
          <form onSubmit={logar}>
            <AreaComp inputSize="16vw">
              <label>Email:</label>
              <Input
                placeholder="Digite seu Email"
                type="text"
                icon={null}
                maxLength={50}
                hg="35px"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </AreaComp>

            <AreaComp inputSize="16vw">
              <label>Senha:</label>
              <Input
                placeholder="Digite sua Senha"
                type="password"
                icon={null}
                maxLength={15}
                hg="35px"
                value={senha}
                onChange={(ev) => setSenha(ev.target.value)}
              ></Input>
            </AreaComp>

            <AreaComp algItem="center" >
              <Button
                type="submit"
                loading={loading}
                wd="100%"
                hg="35px"
                bg="#00ff7f"
                ml="12px"
              >
                Acessar
              </Button>
            </AreaComp>
          </form>
          <Link href="/usuario">
            <Text>
              Não possui uma conta? Cadastra-se
             </Text>
          </Link>

        </ContainerLogin>
      </Container>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});

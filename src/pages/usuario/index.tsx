import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import { Form } from "../../../styles/usuario/styles";
import { Input } from "../../components/ui/Input";
import {
  DivCol,
  DivRow,
  AreaComp,
  Divider,
} from "../../components/Global/styles";
import { PageContainer } from "../../components/PageContainer";
import { AuthContext } from "../../contexts/AuthContext";

import { Button } from "../../components/ui/Button";

export default function Usuario() {
  const { signUp } = useContext(AuthContext);
  const [eyeIsClosed, setEyeIsClosed] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSalvar(event: FormEvent) {
    event.preventDefault();

    if (nome === "" || email === "" || senha1 === "" || senha2 === "") {
      toast.warning("Todos os campos devem ser informados!");
      return;
    }

    if (senha1 != senha2) {
      toast.warning("Senhas não conferem!");
      return;
    }

    try {
      const dados = {
        nome: nome,
        email: email,
        senha: senha1,
        ativo: ativo,
      };

      setLoading(true);
      await signUp(dados);
      setLoading(false);
    } catch (err) {
      toast.error(`Erro ao salvar Usuário! ${err}`);
    }
  }

  return (
    <>
      <Head>
        <title>Cadastro de Usuários</title>
      </Head>

      <PageContainer
        titulo="Adicionar novo usuário"
        titulo2="*Campos obrigatórios"
        wd="25%"
        hg="5vh"
        wdt="25%"
        hgt="12vh"
      >
        <Form onSubmit={handleSalvar}>
          <DivRow>
            <DivCol wd="100%">
              <AreaComp hg="10vh" inputSize="40vh">
                <label>Nome*</label>
                <Input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(ev) => setNome(ev.target.value)}
                  icon={null}
                  autoFocus={true}
                  maxLength={30}
                />
              </AreaComp>

              <AreaComp hg="10vh" inputSize="40vh">
                <label>Email*</label>
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  icon={null}
                  maxLength={40}
                />
              </AreaComp>

              <AreaComp hg="10vh" inputSize="20vh">
                <label>Senha*</label>
                <Input
                  type="password"
                  placeholder="Digite sua Senha"
                  maxLength={15}
                  value={senha1}
                  icon={null}
                  onChange={(ev) => setSenha1(ev.target.value)}
                ></Input>
              </AreaComp>

              <AreaComp hg="8vh" inputSize="20vh">
                <Input
                  type="password"
                  placeholder="Repita sua Senha"
                  value={senha2}
                  onChange={(ev) => setSenha2(ev.target.value)}
                  icon={null}
                  maxLength={15}
                ></Input>
              </AreaComp>
            </DivCol>
          </DivRow>
        </Form>

        <Divider />

        <AreaComp justCont="flex-end" flexDirect="row">
          <Link href="/" passHref>
            <Button
              loading={loading}
              wd="35%"
              hg="42px"
              bg="#000000"
              cl="#f0ffff"
            >
              Cancelar
            </Button>
          </Link>

          <Button
            loading={loading}
            wd="35%"
            hg="42px"
            bg="#f0ffff"
            ml="12px"
            onClick={handleSalvar}
          >
            Cadastrar
          </Button>
        </AreaComp>
      </PageContainer>
    </>
  );
}

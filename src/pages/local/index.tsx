import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";

import { AgGridReact } from "ag-grid-react";
import { AgGridTranslation } from "../../services/agGridTranslation";

import Head from "next/head";
import { toast } from "react-toastify";

import { MdEdit, MdDelete } from "react-icons/md";

import { Input } from "../../components/ui/Input";
import MenuDrawer from "../../components/MenuDrawer";

import { Form, GridContainer, ButtonGrid } from "../../../styles/local/styles";
import {
  DivRow,
  DivCol,
  AreaComp,
  Divider,
} from "../../components/Global/styles";

import { cnpjFormat, cepFormat, telefoneFormat, FormatDateBR, getUF } from "../../utils/util";

import { PageContainer } from "../../components/PageContainer";
import { Button } from "../../components/ui/Button";

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

const contextoTelaEnum = {
  CADASTRAR: "CADASTRAR",
  EDITAR: "EDITAR",
  VISUALIZAR: "VIZUALIZAR",
};

export default function Local() {
  const [contextoTela, setContextoTela] = useState(contextoTelaEnum.EDITAR);
  const [loading, setLoading] = useState(false);

  const [listaLocal, setListaLocal] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [listaTipoLocal, setListaTipoLocal] = useState([]);
  const [tipoLocalSelecionado, setTipoLocalSelecionado] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cidade, setCidade] = useState("");
  const [listaUf] = useState(getUF);
  const [ufSelecionada, setUfSelecionada] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const [entrada, setEntrada] = useState([]);
  const [catraca, setCatraca] = useState([]);

  const limparFormulario = () => {
    setId("");
    setNome("");
    setApelido("");
    setTipoLocalSelecionado("-1");
    setCnpj("");
    setCidade("");
    setUfSelecionada("0");
    setCep("");
    setEndereco("");
    setComplemento("");
    setEmail("");
    setTelefone("");

    setEntrada([]);
    setCatraca([]);

    setContextoTela(contextoTelaEnum.CADASTRAR);
    document.getElementById("iNome").focus();
  };

  async function handleSalvar(event: FormEvent) {
    event.preventDefault();

    if (nome === "") {
      toast.warning("Nome do Tipo de Evento deve ser informado!");
      document.getElementById("iNome").focus();
      return;
    }
    if (Number(tipoLocalSelecionado) < 0) {
      toast.warning("Tipo de Local deve ser selecionado!");
      document.getElementById("iTpLoc").focus();
      return;
    }
    if (Number(ufSelecionada) <= 0) {
      toast.warning("Unidade Federativa deve ser selecionada!");
      document.getElementById("iUf").focus();
      return;
    }
    if (cep === "") {
      toast.warning("CEP deve ser informado!");
      document.getElementById("iCep").focus();
      return;
    }
    if (endereco === "") {
      toast.warning("Endereço deve ser informado!");
      document.getElementById("iEnder").focus();
      return;
    }
    if (email === "") {
      toast.warning("E-mail deve ser informado!");
      document.getElementById("iEmail").focus();
      return;
    }

    const objRequest = {
      nome: nome,
      apelido: apelido,
      idTipoLocal: listaTipoLocal[tipoLocalSelecionado].id,
      cnpj: cnpj.replace(/[^\d]+/g, ""),
      cidade: cidade,
      uf: listaUf[ufSelecionada].label.substring(0, 2),
      cep: cep.replace("-", ""),
      endereco: endereco,
      complemento: complemento,
      email: email,
      telefone: telefone.replace(/[^\d]+/g, ""),
      entrada: entrada,
      catraca: catraca,
    };

    console.log(objRequest);

    try {
      const apiClient = setupAPIClient();
      const url = "/criarLocal";

      // Inclusão
      if (contextoTela === contextoTelaEnum.CADASTRAR) {
        await apiClient.post(url, objRequest);
        toast.success("Local incluído com sucesso!");
      }

      // Alteração
      if (contextoTela === contextoTelaEnum.EDITAR) {
        if (id === "") {
          toast.warning("Id não encontrado");
          return;
        }

        const url = `/alterarLocal?id=${id}`;
        await apiClient.put(url, objRequest);

        toast.success("Local alterado com sucesso!");
      }

      limparFormulario();
      listarLocal();
      document.getElementById("iNome").focus();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao salvar Locais! ${error}`);
    }
  }

  async function listarLocal() {
    const url = "/listarLocal";

    try {
      const apiClient = setupAPIClient();

      const apiResponse = await apiClient.get(url, {});
      setListaLocal(apiResponse.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Tipo de Eventos! ${error}`);
    }
  }
  async function listarTipoLocal() {
    const url = "/listarTipoLocal";

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.get(url, {});
      setListaTipoLocal(apiResponse.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Tipos de Locais! ${error}`);
    }
  }

  const handleGridSelect = async (params) => {
    limparFormulario();

    setId(params.data.id);
    setNome(params.data.nome);
    setApelido(params.data.apelido);
    selectTipoLocal(params.data.idTipoLocal);
    setCnpj(cnpjFormat(params.data.cnpj));
    setCidade(params.data.cidade);
    selectUf(params.data.uf);
    setCep(cepFormat(params.data.cep));
    setEndereco(params.data.endereco);
    setComplemento(params.data.complemento);
    setEmail(params.data.email);
    setTelefone(telefoneFormat(params.data.telefone));

    setEntrada(params.data.entrada);
    setCatraca(params.data.catraca);

    setContextoTela(contextoTelaEnum.EDITAR);
    document.getElementById("iNome").focus();
  };

  const selectTipoLocal = (idTipoLocal) => {
    const idTpLc = listaTipoLocal.map((item, index) => {
      if (item.id === idTipoLocal) {
        setTipoLocalSelecionado(String(index));
      }
    });
  };

  const selectUf = (valor) => {
    const val = listaUf.map((item, index) => {
      if (item.label.substring(0, 2) === valor) {
        setUfSelecionada(String(index));
      }
    });
  };

  const handleExcluir = async (idRow: string) => {
    const userConfirmation = confirm(
      "Você tem certeza de que deseja deletar este item?"
    );
    if (!userConfirmation) {
      limparFormulario();
      document.getElementById("iNome").focus();
      return;
    }

    const url = `/excluirLocal?id=${idRow}`;

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.delete(url, {});

      toast.success("Local excluído com sucesso!");
      listarLocal();
    } catch (err) {
      toast.error(`Erro ao excluir Local! ${err}`);
    } finally {
      limparFormulario();
    }
  };

  useEffect(() => {
    limparFormulario();

    listarLocal();
    listarTipoLocal();

    document.getElementById("iNome").focus();
  }, []);


  // ======= Colunas e APIs da grid ========
  const [, setGridInstance] = useState({ api: {}, columnApi: {} });
  const onGridReady = (params) => {
    /* obtem acesso às APIs da Ag-grid */
    setGridInstance({ api: params.api, columnApi: params.columnApi });
    params.api.sizeColumnsToFit();
  };

  const gridColumnDef = [
    {
      field: "nome",
      headerName: "NOME",
      minWidth: 80,
      maxWidth: 120,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "tipoLocal.nome",
      headerName: "TIPO",
      minWidth: 80,
      maxWidth: 150,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "endereco",
      headerName: "ENDERECO",
      minWidth: 120,
      maxWidth: 120,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "cidade",
      headerName: "CIDADE",
      maxWidth: 130,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "uf",
      headerName: "UF",
      minWidth: 560,
      maxWidth: 60,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },

    {
      field: "entrada",
      headerName: "ENTRADAS",
      maxWidth: 110,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },

    {
      field: "updated_at",
      headerName: "DATA",
      width: 100,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      valueFormatter: ({ data }) => FormatDateBR(data.updated_at),
      cellStyle: { textAlign: "center" },
    },

    {
      field: "Acao",
      headerName: "AÇÕES",
      width: 100,
      lockVisible: true,
      resizable: true,
      cellRendererFramework(params) {
        return (
          <>
            <ButtonGrid>
              <button
                type="button"
                title="Editar"
                onClick={() => handleGridSelect(params)}
              >
                <MdEdit size={22} color="#3fffa3" />
              </button>
              <button
                type="button"
                title="Excluir"
                onClick={() => handleExcluir(params.data.id)}
              >
                <MdDelete size={22} color="#ff3f4b" />
              </button>
            </ButtonGrid>
          </>
        );
      },
    },
  ];
  const rowClassRules = { "grid-red-row": (params) => true };

  return (
    <>
      <Head>
        <title>Locais</title>
      </Head>

      <MenuDrawer titulo="Locais" />

      <PageContainer
        titulo={`Locais - ${contextoTela}`}
        titulo2="*Campos obrigatórios"
        wd="65%"
        hg="10vh"
        wdt="65%"
        hgt="12vh"
      >
        <Form>
          <DivRow>
            <DivCol wd="55%">
              <AreaComp>
                <h1>Informações básicas</h1>
              </AreaComp>

              <AreaComp wd="45vh" hg="35%" inputSize="40vh">
                <label>Nome do local*</label>
                <Input
                  type="text"
                  placeholder="Informe o nome do local"
                  tabIndex={1}
                  maxLength={40}
                  icon={null}
                  id="iNome"
                  value={nome}
                  onChange={(ev) => setNome(ev.target.value)}
                />
              </AreaComp>

              <AreaComp wd="43vh" hg="8vh">
                <label>Selecione um tipo*</label>
                <select
                  tabIndex={3}
                  value={tipoLocalSelecionado}
                  onChange={(ev) => setTipoLocalSelecionado(ev.target.value)}
                  id="iTpLoc"
                >
                  <option></option>
                  {listaTipoLocal.map((item, index) => {
                    return (
                      <option key={item.id} value={index}>
                        {`${item.nome}`}
                      </option>
                    );
                  })}
                </select>
              </AreaComp>
            </DivCol>

            <DivCol wd="45%">
              <AreaComp
                wd="45vh"
                hg="35%"
                inputSize="40vh"
                ml="30px"
                mgTop="4vh"
              >
                <label>Apelido</label>
                <Input
                  type="text"
                  placeholder="Informe um apelido(caso exista)"
                  tabIndex={2}
                  maxLength={40}
                  icon={null}
                  id="iApelido"
                  value={apelido}
                  onChange={(ev) => setApelido(ev.target.value)}
                />
              </AreaComp>

              <AreaComp wd="45vh" hg="35%" inputSize="40vh" ml="30px">
                <label>CNPJ</label>
                <Input
                  type="text"
                  placeholder="Informe o CNPJ"
                  tabIndex={4}
                  maxLength={18}
                  icon={null}
                  id="iCNPJ"
                  value={cnpj}
                  onChange={(ev) => setCnpj(cnpjFormat(ev.target.value))}
                />
              </AreaComp>
            </DivCol>
          </DivRow>

          <Divider />

          <DivRow>
            <DivCol wd="55%">
              <AreaComp>
                <h1>Localização</h1>
              </AreaComp>

              <AreaComp wd="45vh" hg="35%" inputSize="40vh">
                <label>Cidade*</label>
                <Input
                  type="text"
                  placeholder="Informe a Cidade"
                  maxLength={40}
                  tabIndex={5}
                  icon={null}
                  id="iCidade"
                  value={cidade}
                  onChange={(ev) => setCidade(ev.target.value)}
                />
              </AreaComp>
            </DivCol>

            <DivCol wd="45%">
              <AreaComp
                wd="43vh"
                hg="8vh"
                ml="30px"
                mgTop="4vh"
              >
                <label>Estado*</label>
                <select
                  tabIndex={6}
                  value={ufSelecionada}
                  onChange={(ev) => setUfSelecionada(ev.target.value)}
                  id="iUf"
                >
                  <option></option>
                  {listaUf.map((item, index) => {
                    return (
                      <option key={item.value} value={index}>
                        {`${item.label}`}
                      </option>
                    );
                  })}
                </select>
              </AreaComp>
            </DivCol>
          </DivRow>

          <DivRow>
            <DivCol wd="55%">
              <AreaComp wd="45vh" hg="35%" inputSize="40vh">
                <label>CEP*</label>
                <Input
                  type="text"
                  placeholder="Informe o CEP"
                  maxLength={9}
                  tabIndex={7}
                  icon={null}
                  id="iCep"
                  value={cep}
                  onChange={(ev) => setCep(cepFormat(ev.target.value))}
                />
              </AreaComp>
            </DivCol>

            <DivCol wd="45%">
              <AreaComp wd="45vh" hg="35%" inputSize="40vh" ml="30px">
                <label>Endereço*</label>
                <Input
                  type="text"
                  placeholder="Informe o Endereço"
                  tabIndex={8}
                  maxLength={40}
                  icon={null}
                  id="iEnder"
                  value={endereco}
                  onChange={(ev) => setEndereco(ev.target.value)}
                />
              </AreaComp>
            </DivCol>
          </DivRow>

          <DivRow>
            <DivCol wd="55%">
              <AreaComp wd="45vh" hg="35%" inputSize="40vh">
                <label>Complemento</label>
                <Input
                  type="text"
                  placeholder="Informe o complemento"
                  tabIndex={9}
                  maxLength={40}
                  icon={null}
                  id="iCompl"
                  value={complemento}
                  onChange={(ev) => setComplemento(ev.target.value)}
                />
              </AreaComp>
            </DivCol>
          </DivRow>

          <Divider />

          <DivRow>
            <DivCol wd="55%">
              <AreaComp>
                <h1>Contato</h1>
              </AreaComp>

              <AreaComp wd="45vh" hg="8vh" inputSize="40vh">
                <label>E-mail*</label>
                <Input
                  type="text"
                  placeholder="Informe um e-mail"
                  maxLength={40}
                  tabIndex={10}
                  icon={null}
                  id="iEmail"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </AreaComp>
            </DivCol>

            <AreaComp wd="45vh" hg="8vh" inputSize="40vh" ml="30px" mgTop="4vh">
              <label>Telefone</label>
              <Input
                type="text"
                placeholder="Informe um telefone"
                tabIndex={11}
                maxLength={15}
                icon={null}
                id="iFone"
                value={telefone}
                onChange={(ev) => setTelefone(telefoneFormat(ev.target.value))}
              />
            </AreaComp>
          </DivRow>

          <Divider />

          <DivRow>
            <DivCol wd="55%">
              <AreaComp>
                <h1>Cadastro de entradas e catracas</h1>
              </AreaComp>

              <AreaComp wd="45vh" hg="8vh" inputSize="40vh">
                <label>Cadastre as entradas</label>
                <Input
                  type="text"
                  placeholder="Informe a xxx"
                  maxLength={40}
                  tabIndex={12}
                  icon={null}
                  id="iEntrada"
                  value={entrada}
                  onChange={(ev) => setEntrada([ev.target.value])}
                />
              </AreaComp>
            </DivCol>

            <DivCol wd="45%">
              <AreaComp
                wd="45vh"
                hg="8vh"
                inputSize="40vh"
                ml="30px"
                mgTop="4vh"
              >
                <label>Cadastre as catracas</label>
                <Input
                  type="text"
                  placeholder="Informe a xx"
                  maxLength={40}
                  tabIndex={13}
                  icon={null}
                  id="iCatraca"
                  value={catraca}
                  onChange={(ev) => setCatraca([ev.target.value])}
                />
              </AreaComp>
            </DivCol>
          </DivRow>

          <Divider />

          <DivRow>
            <AreaComp hg="25vh">
              <GridContainer>
                <section className="ag-theme-balham-dark">
                  <AgGridReact
                    columnDefs={gridColumnDef}
                    rowData={listaLocal}
                    rowSelection="single"
                    rowClassRules={rowClassRules}
                    animateRows
                    onGridReady={onGridReady}
                    gridOptions={{ localeText: AgGridTranslation }}
                  />
                </section>
              </GridContainer>
            </AreaComp>
          </DivRow>
        </Form>

        <Divider />

        <AreaComp justCont="flex-end" flexDirect="row">
          <Link href="/home" passHref>
            <Button
              loading={loading}
              wd="25%"
              hg="42px"
              bg="#000000"
              cl="#f0ffff"
            >
              Cancelar
            </Button>
          </Link>

          <Button
            loading={loading}
            wd="25%"
            hg="42px"
            bg="#f0ffff"
            ml="12px"
            onClick={handleSalvar}
          >
            Salvar
          </Button>
        </AreaComp>
      </PageContainer>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});

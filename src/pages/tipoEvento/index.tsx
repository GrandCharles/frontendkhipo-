import { FormEvent, useState, useEffect } from "react";
import Link from "next/link";

import { AgGridReact } from "ag-grid-react";
import { AgGridTranslation } from "../../services/agGridTranslation";

import Head from "next/head";
import { toast } from "react-toastify";

import { MdEdit, MdDelete } from "react-icons/md";

import { Input } from "../../components/ui/Input";
import MenuDrawer from "../../components/MenuDrawer";

import { Form, GridContainer, ButtonGrid } from "../../../styles/tipoEvento/styles";
import {
  DivCol,
  DivRow,
  AreaComp,
  Divider,
} from "../../components/Global/styles";

import { PageContainer } from "../../components/PageContainer";
import { Button } from "../../components/ui/Button";

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

const contextoTelaEnum = {
  CADASTRAR: "CADASTRAR",
  EDITAR: "EDITAR",
  VISUALIZAR: "VIZUALIZAR",
};

export default function TipoEvento() {
  const [contextoTela, setContextoTela] = useState(contextoTelaEnum.EDITAR);
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [listaTipoEvento, setListaTipoEvento] = useState([]);

  const limparFormulario = () => {
    setId("");
    setNome("");

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

    const dados = { nome: nome };

    try {
      const apiClient = setupAPIClient();
      const url = "/criarTipoEvento";

      // Inclusão
      if (contextoTela === contextoTelaEnum.CADASTRAR) {
        await apiClient.post(url, dados);
        toast.success("Tipo de Evento incluído com sucesso!");
      }

      // Alteração
      if (contextoTela === contextoTelaEnum.EDITAR) {
        if (id === "") {
          toast.warning("Id não encontrado");
          return;
        }

        const url = `/alterarTipoEvento?id=${id}`;
        await apiClient.put(url, dados);

        toast.success("Tipo de Evento alterado com sucesso!");
      }

      limparFormulario();
      listarTipoEvento();
      document.getElementById("iNome").focus();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao salvar Tipo de Evento! ${error}`);
    }
  }

  async function listarTipoEvento() {
    const url = "/listarTipoEvento";

    try {
      const apiClient = setupAPIClient();

      const apiResponse = await apiClient.get(url, {});
      setListaTipoEvento(apiResponse.data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(`Erro ao listar Tipo de Eventos! ${error}`);
    }
  }

  const handleGridSelect = async (params) => {
    setId(params.data.id);
    setNome(params.data.nome);

    setContextoTela(contextoTelaEnum.EDITAR);
    document.getElementById("iNome").focus();
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

    const url = `/excluirTipoEvento?id=${idRow}`;

    try {
      const apiClient = setupAPIClient();
      const apiResponse = await apiClient.delete(url, {});

      toast.success("Tipo de Evento excluído com sucesso!");
      listarTipoEvento();
    } catch (err) {
      toast.error(`Erro ao excluir Tipo de Evento! ${err}`);
    } finally {
      limparFormulario();
    }
  };

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
      minWidth: 100,
      maxWidth: 800,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
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

  useEffect(() => {
    limparFormulario();
    listarTipoEvento();

    document.getElementById("iNome").focus();
  }, []);

  return (
    <>
      <Head>
        <title>Tipos de Eventos</title>
      </Head>

      <MenuDrawer titulo="Tipos de Eventos" />

      <PageContainer
        titulo="Tipos de Eventos"
        titulo2="*Campos obrigatórios"
        sair={false}
        wd="50%"
        hg="10vh"
      >
        <Form>
          <DivRow>
            <DivCol wd="100%">
              <AreaComp>
                <h1>Informações básicas</h1>
              </AreaComp>

              <AreaComp wd="45vh" hg="35%" inputSize="40vh">
                <label>Nome*</label>
                <Input
                  type="text"
                  placeholder="Informe o nome do tipo de evento"
                  maxLength={40}
                  icon={null}
                  id="iNome"
                  value={nome}
                  onChange={(ev) => setNome(ev.target.value)}
                />
              </AreaComp>
            </DivCol>
          </DivRow>

          <Divider />

          <DivRow>
            <AreaComp hg="41vh">
              <GridContainer>
                <section className="ag-theme-balham-dark">
                  <AgGridReact
                    columnDefs={gridColumnDef}
                    rowData={listaTipoEvento}
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

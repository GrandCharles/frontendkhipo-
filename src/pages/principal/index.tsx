import React, { useState, useEffect } from "react";
import Link from "next/link";

import { AgGridReact } from "ag-grid-react";
import { AgGridTranslation } from "../../services/agGridTranslation";

import Head from "next/head";
import { toast } from "react-toastify";

import { IoHome } from "react-icons/io5";
import { GiStarFlag } from "react-icons/gi";

import MenuDrawer from "../../components/MenuDrawer";

import { Form, ContainerHome, GridContainer } from "../../../styles/principal/styles";
import { DivCol, DivRow, AreaComp } from "../../components/Global/styles";

import { PageContainer } from "../../components/PageContainer";
import { Button } from "../../components/ui/Button";

import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [listaLocal, setListaLocal] = useState([]);
  const [listaEvento, setListaEvento] = useState([]);

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

  useEffect(() => {
    listarLocal();
  }, []);

  // ======= Colunas e APIs da grid ========
  const [, setGridInstance] = useState({ api: {}, columnApi: {} });
  const onGridReady = (params) => {
    /* obtem acesso às APIs da Ag-grid */
    setGridInstance({ api: params.api, columnApi: params.columnApi });
    params.api.sizeColumnsToFit();
  };

  const gridColumnDefLocal = [
    {
      field: "nome",
      headerName: "NOME",
      minWidth: 80,
      maxWidth: 220,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
      //cellStyle: { fontWeight: 'bold' },
    },
    {
      field: "endereco",
      headerName: "ENDERECO",
      minWidth: 80,
      maxWidth: 220,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      flex: 1,
      cellStyle: { textAlign: "left" },
    },
    {
      field: "entrada",
      headerName: "ENTRADAS",
      minWidth: 120,
      maxWidth: 120,
      sortable: true,
      resizable: true,
      filter: true,
      lockVisible: true,
      cellStyle: { textAlign: "left" },
    },
  ];

  const gridColumnDefEvento = [
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
  ];

  const rowClassRules = { "grid-red-row": (params) => true };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <MenuDrawer titulo={"Home"} />

      <PageContainer
        titulo="Olá Mariana"
        titulo2="Confira todos os seus eventos e locais em só lugar"
        wd="auto"
        hg="15vh"
        wdt="160vh"
        hgt="16vh"
        bc="#191e28"
      >
        <Form>
          <DivRow>
            <DivCol wd="50%">

              <ContainerHome wd="75vh" hg="15vh" bc="#808000">
                <DivCol wd="60%">
                  <AreaComp mgTop="25px">
                    <h3>
                      <IoHome size={25} color="#fff" />
                      Locais
                    </h3>

                    <h1>Confira todo os locais cadastrados!</h1>
                  </AreaComp>
                </DivCol>

                <DivCol wd="40%">
                  <AreaComp justCont="flex-end" flexDirect="row" mgTop="25px">
                    <Link href="/local" passHref>
                      <Button
                        loading={loading}
                        wd="80%"
                        hg="42px"
                        bg="#f0ffff"
                        ml="12px"
                      >
                        Conferir locais
                      </Button>
                    </Link>
                  </AreaComp>
                </DivCol>
              </ContainerHome>
            </DivCol>

            <DivCol wd="50%">
              <ContainerHome wd="75vh" hg="15vh" bc="#CD5C5C">
                <DivCol wd="60%">
                  <AreaComp mgTop="25px">
                    <h3>
                      <GiStarFlag size={25} color="#fff" />
                      Eventos
                    </h3>
                    <h1>Confira todo os eventos cadastrados!</h1>
                  </AreaComp>
                </DivCol>

                <DivCol wd="40%">
                  
                  <AreaComp justCont="flex-end" flexDirect="row" mgTop="25px">
                    <Link href="/Evento" passHref>
                      <Button
                        loading={loading}
                        wd="85%"
                        hg="42px"
                        bg="#f0ffff"
                        ml="10px"
                      >
                        Conferir eventos
                      </Button>
                    </Link>
                  </AreaComp>
                </DivCol>
              </ContainerHome>
            </DivCol>
          </DivRow>

          <DivRow>
            <DivCol wd="50%">
              <ContainerHome wd="75vh" hg="35vh" bc="#191e28">
                <AreaComp hg="5vh" justCont="space-between" flexDirect="row">
                  <label>Ultimos Locais adicionados</label>
                  <label>Ver todos</label>
                </AreaComp>

                <AreaComp hg="30vh">
                  <GridContainer>
                    <section className="ag-theme-balham-dark">
                      <AgGridReact
                        columnDefs={gridColumnDefLocal}
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
              </ContainerHome>
            </DivCol>

            <DivCol wd="50%">
              <ContainerHome wd="75vh" hg="35vh" bc="#191e28">
                <AreaComp hg="5vh" justCont="space-between" flexDirect="row">
                  <label>Ultimos Eventos adicionados</label>
                  <label>Ver todos</label>
                </AreaComp>

                <AreaComp hg="30vh">
                  <GridContainer>
                    <section className="ag-theme-balham-dark">
                      <AgGridReact
                        columnDefs={gridColumnDefEvento}
                        rowData={listaEvento}
                        rowSelection="single"
                        rowClassRules={rowClassRules}
                        animateRows
                        onGridReady={onGridReady}
                        gridOptions={{ localeText: AgGridTranslation }}
                      />
                    </section>
                  </GridContainer>
                </AreaComp>
              </ContainerHome>
            </DivCol>
          </DivRow>
        </Form>
      </PageContainer>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});

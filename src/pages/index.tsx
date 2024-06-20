import Head from "next/head";
import Login from "../pages/login/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Khipo - GrandCharles</title>
      </Head>

      <Login />
    </>
  );
}

import Head from "next/head";
import Login from "../pages/login";

export default function Home() {
  console.log('ola')
  return (
    <div>
      <Head>
        <title>Khipo - GrandCharles</title>
      </Head>

      <Login />
    </div>
  );
}

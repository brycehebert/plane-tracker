import Head from "next/head";
import Nav from "./Nav";

export default function Layout({ children }:{children: React.ReactNode}) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Airplane Tracking</title>
      </Head>
      <Nav/>
      <main>{children}</main>
    </>
  );
}

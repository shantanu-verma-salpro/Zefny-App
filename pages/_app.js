import { Provider } from "next-auth/client";
import Head from 'next/head';
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
import { DefaultSeo } from "next-seo";
import 'antd/dist/antd.css'

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      <meta charset='utf-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />

      <link rel='manifest' href='/manifest.json' />
      <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
      <link rel='apple-touch-icon' href='/apple-icon.png'></link>
      <meta name='theme-color' content='#317EFB' />
    </Head>
    <Provider session={pageProps.session}>
      <TopProgressBar />
      <DefaultSeo />
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

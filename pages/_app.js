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
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <link rel='manifest' href='/manifest.json' />
      <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
      <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
     <meta name='application-name' content='Zefny' />
     <meta name='mobile-web-app-capable' content='yes' />
      <meta name='theme-color' content='#317EFB' />
      <link rel="shortcut icon" href="/icons/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
<link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
    </Head>
    <Provider session={pageProps.session}>
      <TopProgressBar />
      <DefaultSeo />
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

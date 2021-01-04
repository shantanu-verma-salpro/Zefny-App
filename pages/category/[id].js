import { useState,useEffect } from 'react';
import GetPosts from '../../components/Category';

import Head from 'next/head';
import Link from "next/link";
import { NextSeo } from "next-seo";
import Router, { useRouter } from "next/router";
import { PageHeader,Layout,Button} from 'antd';
const {  Footer, Sider, Content } = Layout;
import styles from '../../components/Category.module.css'

function SEO(props){
    return <NextSeo
          title={props.category}
          description={`Posts related to ${props.category}`}
           openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://zefny.com",
          site_name: "Zefny",
        }}
        />
}

export default function Category({ id }) {
     const [page,setPage] = useState(1);
     function setNext(){
        setPage(page+1);
     }
     function setInitial(){
        setPage(1);
     }
     const router = useRouter();
     return (
        <div>
        <SEO category={id}/>
        <Layout  style={{ minHeight: '100vh' }} >
      <PageHeader
    className={styles["myHeader"]}
    onBack={() => router.push('/')}
    title="Back"
    subTitle=""
  /> 
      <Layout>
<Sider style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
          minWidth:"60px"
        }} width="60"
      >
 <div className={styles["side-actions"]}>
<Button type="primary"  size="large">
          
        </Button>
        </div>
      </Sider>
        <Content className={styles["post-c"]}>
        <GetPosts id={id} limit="10" page={page} handler={setNext} homeHandler={setInitial}/>
         </Content>
     
        
      </Layout>
   
      <Footer className={styles["foot-c"]}>Footer</Footer>
    </Layout>
        
        </div>
        );

}
export async function getStaticPaths() {
    const categories = ["Fashion",
        "Travel",
        "Music",
        "Lifestyle",
        "Fitness",
        "DIY",
        "Sports",
        "Developers",
        "General"
    ];
    const paths = categories.map((m) => ({
        params: { id: m },
    }));
    return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
    if (params) {
        return { props: { id: params.id } };
    } else {
        return { notFound: true, };
    }

}
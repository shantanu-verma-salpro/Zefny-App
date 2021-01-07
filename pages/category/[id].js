import { useState, useEffect } from 'react';
import GetPosts from '../../components/Category';
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { PageHeader, Layout } from 'antd';
const { Content } = Layout;
import styles from '../../components/Category.module.css'
import dynamic from "next/dynamic";
import Footers from "../../components/Footers";
const Sidebar = dynamic(() => { return import("../../components/Menu") }, { ssr: false });
function SEO(props) {
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
    const [page, setPage] = useState(1);
    function setNext() {
        setPage(page + 1);
    }
    const categories = ["Fashion",
        "Travel",
        "Music",
        "Lifestyle",
        "Fitness",
        "DIY",
        "Sports",
        "Developers",
        "General"];
    function setInitial() {
        setPage(1);
    }
    const router = useRouter();
    return (
        <div>
            <SEO category={id} />
            <Layout style={{ minHeight: '100vh' }} >
                <Sidebar categories={categories} />


                <Layout className="site-layout">
                    <PageHeader
                        className={styles["myHeader"]}
                        onBack={() => router.back()}
                        title="Back"
                        subTitle=""
                    />

                    <Content className={styles["post-c"]}>
                        <GetPosts id={id} limit="10" page={page} handler={setNext} homeHandler={setInitial} />
                    </Content>

                    <Footers />
                </Layout>


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
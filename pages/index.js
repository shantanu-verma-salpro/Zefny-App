import Head from "next/head";
import Link from "next/link";

import getBlogIndex from "../util/blogFetch";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { NextSeo } from "next-seo";
import Image from "next/image";

import {
  UserOutlined,
  AlignLeftOutlined,
  MessageOutlined,
  SearchOutlined,
  ExportOutlined,
  PlusOutlined,
  RightOutlined,
  LeftOutlined,
  BookOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Menu,
  Row,
  Col,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Divider,
  Card,
  Space,
  message,
} from "antd";

const { Header, Sider, Content, Footer } = Layout;
const { Text, Title } = Typography;
const { SubMenu } = Menu;

export default function Home({ data }) {
  if(!data) return <p>Loading..</p>;
  const [session, loading] = useSession();
  const [page_num, setPage] = useState(0);
  const [collapsed, setCollapsed] = useState(true);
  const page_size = 6;
  const categories = ["Fashion",
    "Travel",
    "Music",
    "Lifestyle",
    "Fitness",
    "DIY",
    "Sports",
    "Developers",
    "General"] ;
  const paginate = () => {
    return data.slice(page_num * page_size, page_num * page_size + page_size);
  };
  const [blogs_titles, setTitles] = useState(
    data.slice(0 * page_size, 0 * page_size + page_size)
  );

  function next_page() {
    if (page_num * page_size >= data.length - page_size) {
      message.error("You are at last page");
    } else {
      setPage(page_num + 1);
    }
  }
  useEffect(() => {
    setTitles(paginate());
  }, [page_num]);

  function prev_page() {
    if (page_num <= 0) {
      message.error("You are at first page");
    } else {
      setPage(page_num - 1);
    }
  }
 

  function i_card(slug, title, author, date, category) {
    return (
      <Col md={8} xs={24}>
        <Card
          title={
            <div>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <div className="date-c">{new Date(date).toDateString()} by {author}</div>
            </div>
          }
          hoverable={true}
          
        >
          <Image
            src={`/${category}.jpg`}
            alt={title}
            layout="responsive"
            height="268"
            width="398"
          />
        </Card>
      </Col>
    );
  }

  function createCards(ith_iteration) {
    let arr = [];
    let op = 0;
    const bt = (k) => blogs_titles[k];
    const btt = (k) =>
      i_card(
        bt(k).slug,
        bt(k).title,
        bt(k).author,
        bt(k).dateCreated,
        bt(k).category
      );
    let a = 3 * ith_iteration;
    let b = a + 3;
    let i = a;
    for (i = a; i < b && bt(i); ++i) {
      arr.push(btt(i));
    }
    return arr;
  }

  return (
    <>
      <NextSeo
        title="Zefny"
        description="Share your thoughts with the world."
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://zefny.com",
          site_name: "Zefny",
        }}
      />
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
        collapsible={true} 
        collapsed={collapsed}
        onCollapse={( c ,t) => {setCollapsed(c)}}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0
        }}
      > <div className="logo" >zf</div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
               <SubMenu key="sub1" icon={<BookOutlined />} title="Category">
               {categories.map((m,idx)=>(
                <Menu.Item key={idx+1}>
              <Link href={`/category/${m}`}><a>{m}</a></Link>
            </Menu.Item>
                ))}
               </SubMenu>
            
            <Menu.Item key="2" icon={<MessageOutlined />}>
              Contact Us
            </Menu.Item>
            <Menu.Item key="3" icon={<SearchOutlined />}>
              Search
            </Menu.Item>
          </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background headr"
              style={{ padding: 0 }}
            >
              <Row className="">
                <Col flex={1}>
                 <Divider type="vertical" />
                  <Button type="primary">
                    <Link href="/create">
                      <a>
                        <PlusOutlined /> Create
                      </a>
                    </Link>
                  </Button>

                </Col>
                <Col flex={4}>
                  <div className="lol">
                    {session ? (
                      <div>
                      <Tooltip title={session.user.name}>
                          <Avatar
                            style={{ backgroundColor: "rgb(0, 82, 157)" }}
                            icon={<UserOutlined />}
                          />
                        </Tooltip>
                         <Divider type="vertical" />
                        <Button
                          onClick={signOut}
                          type="primary"
                          icon={<ExportOutlined />}
                        >
                          Signout
                        </Button>
                       
                        
                      </div>
                    ) : (
                      <Button
                        type="primary"
                        onClick={signIn}
                        icon={<ExportOutlined />}
                      >
                        Signin
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Title className="pop-heading" level={4}>
                Recently Published{" "}
              </Title>
              <div className="page-d">
                <Space>
                  <Button className="home-pag"
                    onClick={() => prev_page()}
                    icon={<LeftOutlined />}
                  ></Button>
                  <Button className="home-pag"
                    onClick={() => next_page()}
                    icon={<RightOutlined />}
                  ></Button>
                </Space>
              </div>

              <div className="site-card-wrapper">
                <Row gutter={16}>{createCards(0)}</Row>
                <Row gutter={16}>{createCards(1)}</Row>
              </div>
              <br />
              <br />
              <Title className="pop-heading" level={4}>
                Developers
              </Title>
              <Row gutter={16}>
               {data
                  .filter((el) => el.category == "Developers")
                  .slice(0, 2)
                  .map((m) => (
                    <Col md={8} xs={24}>
                    <div className="cat-p">
                    <div className="left-card"><BookOutlined/></div>
                    <div className="right-card">
                      <Link href={`/posts/${m.slug}`}>
                        <a>
                          <Title className="cat-head" level={4}>
                            {m.title.slice(0,25)}...
                          </Title>
                        </a>
                      </Link>
                      <Text className="pop-desc">
                        {" "}
                        <b>{m.author}</b> on{" "}
                        <b>{new Date(m.dateCreated).toDateString()}</b>
                      </Text>
                      </div>
                      </div>
                    </Col>
                  ))}
              </Row>
              <br />
              <br />
              <Title className="pop-heading" level={4}>
                Lifestyle
              </Title>
              <Row gutter={16}>
                {data
                  .filter((el) => el.category == "Lifestyle")
                  .slice(0, 2)
                  .map((m) => (
                    <Col md={8} xs={24}>
                    <div className="cat-p">
                    <div className="left-card"><BookOutlined/></div>
                    <div className="right-card">
                      <Link href={`/posts/${m.slug}`}>
                        <a>
                          <Title className="cat-head" level={4}>
                            {m.title.slice(0,25)}...
                          </Title>
                        </a>
                      </Link>
                      <Text className="pop-desc">
                        {" "}
                        <b>{m.author}</b> on{" "}
                        <b>{new Date(m.dateCreated).toDateString()}</b>
                      </Text>
                      </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            </Content>
            <Footer style={{ textAlign: "center" }}>Created by Cmaster</Footer>
          </Layout>
        </Layout>
      <style global jsx>
        {`
          .trigger {
            font-size: 18px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
          }
          .home-pag {
    width: 32px;
    height: 32px;
    padding: 2.4px 0;
    font-size: 16px;
    border-radius: 2px;
    vertical-align: -1px;
    background: #021931 !important;
    color: #ffffffb3 !important;
    border: 1px solid #ffffffb3;
}
          .ant-card-body {
            padding: 0px;
            background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggZD0iTTAgNCBMMCAyOCBMMzIgMjggTDMyIDQgeiBNNCAyNCBMMTAgMTAgTDE1IDE4IEwxOCAxNCBMMjQgMjR6IE0yNSA3IEE0IDQgMCAwIDEgMjUgMTUgQTQgNCAwIDAgMSAyNSA3Ij48L3BhdGg+Cjwvc3ZnPg==") no-repeat center hsl(210, 91.7%, 4.7%);
    background-size: auto;
background-size: calc(100%/3);
color: transparent;
          }
          .ant-card-head-title {
            white-space: break-spaces;
            margin-bottom: 0.5em;
            
            font-weight: 600;
            font-size: 18px;
            line-height: 1.4;
          }
          .ant-card-head-title a {
            color: rgba(255, 255, 255, 0.98);
          }
          .ant-card {
    margin-bottom: 30px;
    border: 0px;
    background: #0a3155;
    color: white;
}
          .page-d {
            float: right;
          }
          .cat-p {
    
  margin-bottom: 30px;
padding: 0;
background: #0a3155;
}
.cat-p a h4{
  color:white;
}
.left-card{
  display: inline-block;
width: 30%;
font-size: 4.5rem;
padding-left: 20px;
}
.right-card{
  display: inline-block;
width: 70%;

vertical-align : text-bottom
}
.cat-p span{
  color: #ffffffa3;
font-weight: 100;
}
          .lol {
            float: right;
            margin-right: 10px;
          }
          .ant-layout {
            background: #001529;
          }
          .headr {
            overflow: hidden;
            background :#001529 !important;
          }
          .trigger:hover {
            color: #1890ff;
          }
          .ant-layout-footer {
            background: #fff;
          }
          .pop-heading {
           color: #fffc !important;
margin-bottom: 30px !important;
border-bottom: 2px solid #ffffffa8;
display: inline-block;
padding-bottom: 5px;
font-size: 18px !important;
          }
          .logo {
            height: auto;
            background: transparent;
            margin: 16px;
            color: #ffffffd9;
            font-size: 28px;
            font-family: serif;
            text-align: center;
            border: 1px solid #ffffff52;
          }
          .date-c {
            font-size: 14px;
padding-top: 8px;
color: #ffffffa3;
font-weight: 500;
          }
 

          .cat-head {
            color: black;
            font-size: 18px !important;
          }
          .site-layout .site-layout-background {
            background:#001529;
          }
          .ant-layout-footer {
            font-weight: 900;
            background :#001529;
            color:white
          }
          .ant-layout-content {
   
    padding: 5px !important;
}
        `}
      </style>
    </>
  );
}

export async function getStaticProps() {
  const movies = await getBlogIndex();
  return {
    props: { data: JSON.parse(JSON.stringify(movies)) },
    revalidate: 10,
  };
}

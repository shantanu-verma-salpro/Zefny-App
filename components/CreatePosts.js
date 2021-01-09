import React, { useState } from "react";
import { signOut } from "next-auth/client";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { Button, Space, message, Dropdown, Menu, Layout, PageHeader, Avatar, Tooltip } from 'antd';
const { Content } = Layout;
import Footers from "./Footers";
import {
  DownOutlined
} from '@ant-design/icons';
import styles from './CreatePost.module.css';
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});
const mdParser = new MarkdownIt({
  typographer: true,
  breaks: true,
  linkify: true,
});

export default function CreatePosts({ user }) {
  const [t, setT] = useState("");
  const [c, setC] = useState("");
  const [err, setErr] = useState("");
  const [titleErr, setTErr] = useState("");
  const categories = ["Fashion",
    "Travel",
    "Music",
    "Lifestyle",
    "Fitness",
    "DIY",
    "Sports",
    "Developers",
    "General"];
  const [post_category, setPostC] = useState("General");

  function handleTitle(event) {
    let ne = event.target.value.replace(/\s+/g, " ").trim();
    if (ne.length > 60) setTErr("Title length should be atmost 60 chars");
    else if (ne.length > 10) {
      setTErr("");
      setT(ne);
    } else {
      setTErr("Title length should be atleast 10 characters");
    }
  }

  function handleEditorChange({ html, text }) {
    if (text.length > 7500) {
      setErr("Exceeded content limit / 7500");
    } else {
      setErr("");
      setC(text);
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let blogContent = {
      title: t,
      content: c,
      author: user.name,
      "category": post_category
    };
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    let fetch_op = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(blogContent),
    };
    try {
      if (err === "" && titleErr === "" && t !== "" && c != "") {
        const res = await fetch("/api/posts", fetch_op);
        if (res.status !== 201) {
          message.error("Network Error");
        } else {
          setT("");
          setC("");
          message.success("Successfully published!");
        }
      } else {
        message.error("Error : " + ((err == "") ? titleErr : err));
      }
    } catch (e) {
      message.error("Error");
    }
  }



  function handleMenuClick(e) {
    message.info(e.key + " selected.");
    setPostC(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {categories.map((c) => (
        <Menu.Item key={c} >
          {c}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (

    <Layout>


      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="Create article"
        subTitle="Supports Markdown!"
        extra={[
          <Tooltip title={user.name}><Avatar
            src={<Image
              alt="Author profile"
              height="50"
              width="50"
              src={user.image}
            ></Image>} /></Tooltip>,
          <Button onClick={signOut}>Signout</Button>,

        ]}
      >
      </PageHeader>

      <Layout className={styles["ac-layout"]}>
        <Content>
          <form onSubmit={handleSubmit}>
            <div className={styles["actions"]}>
              <Space>
                <input className="ant-input" type="text" placeholder="I'm creative!" value={t} onChange={(e) => handleTitle(e)} />
                <Dropdown overlay={menu}>
                  <Button>
                    Select Category <DownOutlined />
                  </Button>
                </Dropdown>
                <button type="submit" className="ant-btn ant-btn-primary">Submit</button>
              </Space>
            </div>
            <MdEditor className={styles["editor"]}
              style={{ height: "500px", margin: "20px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />



          </form>
        </Content>
      </Layout>
      <Footers />
    </Layout>





  );
}

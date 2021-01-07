import {
  Menu,
  Layout,
  Dropdown,
  Drawer,
  Input,
  Skeleton,
  Empty
} from "antd";
import {
    DownloadOutlined,
  SearchOutlined,
  BookOutlined,
} from "@ant-design/icons";
import styles from './Menu.module.css';
import Link from 'next/link';
const { Sider } = Layout;
const { SubMenu } = Menu;
import { useState, useLayoutEffect } from 'react';
const { Search } = Input;

function useWindowSize() {

  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
export default function Sidebar(props) {
  const [width, height] = useWindowSize();
  const [collapsed, setCollapsed] = useState(true);
  const { categories } = props;
  const { download } = props;
  const [visible, setVisible] = useState(false);
  const [searchT,setSearchT] = useState([]);
  const [loadT,setLoad] = useState(false);
  const showDrawer = () => {
      setVisible(true);
  };
  const onClose = () => {
      setVisible(false);
  };
  const menu = (
    <Menu theme="dark">
      {categories.map((m, idx) => (
        <Menu.Item key={idx + 1}>
          <Link href={`/category/${m}`}><a>{m}</a></Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const onSearch = async (value) => {
    setLoad(true);
    const d = await fetch(`/api/search?q=${value}`);
    const data = await d.json();
    setSearchT(data.data);
    setLoad(false);
  }
  function getList(){
    return searchT.map((m)=><div><br/><Link href={`/posts/${m.slug}`}><a>{m.title}</a></Link></div>);
  }
  return (<>

  
        <Drawer
            title="Search"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
        >
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: '80%' }} /><br/>
          <div>{loadT?<Skeleton active />:(searchT.length?getList():<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}</div>
        </Drawer>
    
    { (width > 460) ?
      <Sider
        collapsible={true}
        collapsed={collapsed}
        onCollapse={(c, t) => { setCollapsed(c) }}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0
        }}
      > <div className={styles.logo} ><img alt="logo" src="/favicon-32x32.png"/></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="sub1" icon={<BookOutlined />} title="Category">
            {categories.map((m, idx) => (
              <Menu.Item key={idx + 1}>
                <Link href={`/category/${m}`}><a>{m}</a></Link>
              </Menu.Item>
            ))}
          </SubMenu>

          <Menu.Item key="2" icon={<DownloadOutlined />}>
            <a onClick={download}>Download</a>
          </Menu.Item>
          <Menu.Item key="3" icon={<SearchOutlined />} onClick={showDrawer}>
          
        Search
      
            </Menu.Item>
        </Menu>
      </Sider> :
      <div class={styles.navbar}>
        <Dropdown overlay={menu} placement="topLeft" trigger={['click']}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()} >
            <BookOutlined />
          </a>
        </Dropdown>
        <a onClick={showDrawer}><SearchOutlined /></a>
        <a onClick={download}><DownloadOutlined /></a>
      </div>
    }</>
  );
}
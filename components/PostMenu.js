import {
  Menu,
  Typography,
  Layout,
  Dropdown
} from "antd";
import {
  DownloadOutlined,
  SearchOutlined,
  BookOutlined,
} from "@ant-design/icons";
import styles from './Menu.module.css';
import Link from 'next/link';
const { Sider} = Layout;
const { Text, Title } = Typography;
const { SubMenu } = Menu;
import {useState,useLayoutEffect} from 'react';
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
export default function Sidebar(props){
   const [width, height] = useWindowSize();
   const [collapsed, setCollapsed] = useState(true);
   const {categories} = props;
   const {download} = props;
   const menu = (
  <Menu theme="dark">
   {categories.map((m,idx)=>(
                <Menu.Item key={idx+1}>
              <Link href={`/category/${m}`}><a>{m}</a></Link>
            </Menu.Item>
                ))}
  </Menu>
);
  return (<>
      { (width>460)?
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
      > <div className="logo" >ts</div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
               <SubMenu key="sub1" icon={<BookOutlined />} title="Category">
               {categories.map((m,idx)=>(
                <Menu.Item key={idx+1}>
              <Link href={`/category/${m}`}><a>{m}</a></Link>
            </Menu.Item>
                ))}
               </SubMenu>
            
            <Menu.Item key="2" icon={<DownloadOutlined />}>
              <a onClick={download}>Download</a>
            </Menu.Item>
            <Menu.Item key="3" icon={<SearchOutlined />}>
              Search
            </Menu.Item>
          </Menu>
          </Sider>:
          <div class={styles.navbar}>
  <Dropdown overlay={menu} placement="topLeft">
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} >
     <BookOutlined />
    </a>
  </Dropdown>
  <a href="#news"><SearchOutlined /></a>
  <a onClick={download}><DownloadOutlined /></a>
</div>
}</>
    );
}
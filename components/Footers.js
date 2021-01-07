import {
  Layout,
} from "antd";
import style from './footer.module.css';
const { Footer } = Layout;
export default function Footers() {
  return <Footer className={style.footers}>Zefny | Made with next.js </Footer>;
}
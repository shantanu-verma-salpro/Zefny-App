import { NextSeo } from "next-seo";
import { Alert } from 'antd';
export default function Pageerror() {
  return (
    <>
      <NextSeo nofollow={true} />
       <Alert
      message="Unauthorized"
      description="To create Post you need to login or signup!"
      type="error"
    />
    </>
  );
}

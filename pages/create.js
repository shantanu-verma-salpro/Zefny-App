import { useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { Skeleton } from 'antd';

const Error_Page = dynamic(() => import("../components/Pageerror"));
const Create_Posts = dynamic(() => import("../components/CreatePosts"));

export default function Create() {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return <Skeleton active />;

  if (!session) return <Error_Page />;

  return <Create_Posts user={session.user} />;
}

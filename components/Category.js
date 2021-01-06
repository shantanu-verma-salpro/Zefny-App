import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

import { Skeleton,Button } from "antd";
import { Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import styles from './Category.module.css'
const { Title,Text } = Typography;
import Image from 'next/image';
export default function GetPosts(props) {
    const { id, limit, page } = props;
    const q = `/api/category?category=${id}&limit=${limit}&page=${page}`;
    const { data, error } = useSWR(q, fetcher);
    if (error) return <div>failed to load :(</div>;
    if (!data) return <div><Skeleton active /><Skeleton active /></div>;
    if(data.data.length===0) return <div>End of posts!<br/> <Button type="primary" onClick={props.homeHandler}>Initial Page</Button></div>;
    return (
        <div>
        	{data.data.map((m)=>(


                    <div className={styles["cat-p"]}>
                    <div className={styles["left-card"]}><Image
            src={`/${m.category}.jpg`}
            alt={m.title}
            layout="responsive"
            height="100"
            width="120"
          /></div>
                    <div className={styles["right-card"]}>
                      <Link href={`/posts/${m.slug}`}>
                        <a>
                          <Title className={styles["cat-head"]} level={4}>
                            {m.title}
                          </Title>
                        </a>
                      </Link>
                      <Text className={styles["pop-desc"]}>
                        {" "}
                        <b>{m.author}</b> on{" "}
                        <b>{new Date(m.dateCreated).toDateString()}</b>
                      </Text>
                      </div>
                      </div>
                    
        		))}
        	<Button className={styles.nextbtn} onClick={props.handler}>Next</Button>
        	</div>

    );

}
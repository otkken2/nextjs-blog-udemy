import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';

import Link from "next/link";
import { getPostsData } from '../lib/post';

// SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData();
  console.log(allPostsData); //id,title,date,thumbnail

  return {
    props: {
      allPostsData,
    }
  }
}
// SSRの場合
// export async getServerSideProps(context){
//   return{
//     props: {

//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私は将来富裕層になるWebエンジニアです。お金が大好きです。
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id,title,date,thumbnail})=>(
            <article key={id}>
              <Link href={`/posts/${id}`}>
                {/* <img src={`${thumbnail}`}  */}
                <img src={thumbnail} 
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
          
            
        </div>
      </section>
    </Layout>
  )
}

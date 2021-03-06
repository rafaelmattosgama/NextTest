import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'



export default function Home({planos}) {
  console.log('RawPlano:', planos)
  // const obj = JSON.parse(plano)
  // console.log('Plano:', obj)
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      {planos.map((process, i) => (
            <div key = {i}>
            <h1 className={styles.title}>
              {process.Process}
            </h1>
            </div>

      ))}





        

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: 'http://10.70.2.60:1337/graphql',
    cache: new InMemoryCache
  })

  const { data } = await client.query({
    query: gql`
    query getPlanodemelhorias {
      planoDeMelhorias {
        id
        Image_Doc{url}
        Pilot{username}
        Process
        Type
        Actions{Action_Description}
        created_at
        Source
        Process
        updated_at
        Area
      }
    }
  `
  })

  // console.log('rawdata:', typeof data)

  // const alldata = JSON.stringify(data.planoDeMelhorias)

  // console.log('Json:', typeof alldata)

  return {
    props: {
      planos: data.planoDeMelhorias
    }
  }
}

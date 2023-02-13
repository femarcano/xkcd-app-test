import Head from 'next/head'

import { Layout } from '@/components/Layout'

export default function Search({ query }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-3xl font-bold text-center mb-10">
          Resultados para {query}
        </h1>
        <section className="grid grid-cols-2 gap-4 justify-items-center max-w-xl3 m-auto sm:grid-cols-2 md:grid-cols-3"></section>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  return {
    props: { query: q },
  }
}

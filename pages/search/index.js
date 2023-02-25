import { search } from '@/services/search'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Layout } from '@/components/Layout'
import { useI18N } from '@/context/i18n'

export default function Search({ query, results }) {
  const { t } = useI18N()
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
          {t('SEARCH_RESULTS_TITLE', results.length, query)}
        </h1>
        <section className="grid grid-cols-2 gap-4 justify-items-center max-w-xl3 m-auto sm:grid-cols-2 md:grid-cols-3">
          {results.map((result) => {
            return (
              <Link
                className="flex flex-row bg-slate-300 hover:bg-slate-500 justify-start content-center"
                href={`/comic/${result.id}`}
                key={result.id}
              >
                <Image
                  className="rounded-full"
                  alt={result.alt}
                  src={result.img}
                  width={50}
                  height={50}
                ></Image>
                <div>
                  <h2>{result.title}</h2>
                </div>
              </Link>
            )
          })}
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })
  console.log(results)

  return {
    props: { query: q, results: results },
  }
}

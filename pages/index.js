import { Layout } from '@/components/Layout'
import { useI18N } from '@/context/i18n'
import { Inter } from '@next/font/google'
import fs from 'fs/promises'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ latestComics }) {
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
        <h2 className="text-3xl font-bold text-center mb-10">
          {t('LATEST_COMICS')}
        </h2>
        <section className="grid grid-cols-2 gap-4 justify-items-center sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => {
            return (
              <Link
                className="mb-4 pb-4"
                href={`/comic/${comic.id}`}
                key={comic.id}
              >
                <h3 className="text-lg font-bold text-center">{comic.title}</h3>
                <Image
                  width={comic.width}
                  height={comic.height}
                  src={comic.img}
                  alt={comic.alt}
                />
              </Link>
            )
          })}
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)
  return {
    props: {
      latestComics,
    },
  }
}

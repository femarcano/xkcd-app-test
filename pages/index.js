import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '../components/Header'
import fs from 'fs/promises'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ latestComics }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header></Header>
        <h2>Latest Comics</h2>
        {latestComics.map((comic) => {
          return (
            <>
              <Link href={`/comic/${comic.id}`} key={comic.id}>
                <img src={comic.img} alt={comic.alt} />
              </Link>
            </>
          )
        })}
      </main>
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
  console.log(latestComics)
  return {
    props: {
      latestComics,
    },
  }
}

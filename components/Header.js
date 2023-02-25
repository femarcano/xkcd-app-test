import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'

export default function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales, asPath } = useRouter()

  const getValue = () => searchRef.current?.value

  const handleChange = () => {
    const q = getValue()
    if (!q) return
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => setResults(searchResults))
  }

  const restOfLocales = locales.filter((l) => l !== locale)

  return (
    <header className="flex justify-between items-center border-2 border-blue-500 p-4 max-w-xl m-auto rounded-md">
      <h1 className="font-bold">
        Next<span className="font-light">xkcd</span>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2  text-sm font-bold">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href={`${asPath}`} locale={restOfLocales[0]}>
              {restOfLocales[0]}
            </Link>
          </li>
          <li>
            <input
              className="px-2 py-1 border-gray-400 border-2 rounded-3xl"
              ref={searchRef}
              type={'search'}
              onChange={handleChange}
            />
            <div className="relative">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0 bg-white">
                  <ul className="w-full border border-gray-50 rounded-lg shadow-xl overflow-hidden">
                    <li className=" m-0" key="results_all">
                      <Link
                        className=" block text-gray-400 italic px-2 py-1text-sm font-semibold hover:bg-blue-100"
                        href={`/search?q=${getValue()}`}
                      >
                        See {results.length} results
                      </Link>
                    </li>
                    {results.map((result, index) => (
                      <li className=" m-0" key={result.id}>
                        <Link
                          className=" block px-2 py-1text-sm font-semibold hover:bg-blue-100"
                          href={`/comic/${result.id}`}
                        >
                          {result.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

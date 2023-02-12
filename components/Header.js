import Link from 'next/link'

export default function Header() {
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
            <Link href="/search">Search</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

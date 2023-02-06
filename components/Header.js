import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div>
                <h1>Next xkcd</h1>
            </div>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/">About</Link></li>
                    <li><Link href="/">Search</Link></li>
                </ul>
            </nav>
        </header>
    )
}
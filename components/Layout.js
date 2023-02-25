import Header from '@/components/Header'
import Footer from '@/components/Footer'

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-xl3 m-auto">{children}</main>
      <Footer />
    </>
  )
}

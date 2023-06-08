import Nav from "@/components/Nav"
import Provider from "@/components/Provider"
import "@/styles/globals.css"

export const metadata = {
  title: "Share Prompts",
  description: "Discover & Share AI Prompts",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={undefined}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout

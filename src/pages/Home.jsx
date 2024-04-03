import Layout from "../components/Layout"
import { useAuth } from "../context/auth"

function Home() {

  const [auth, setAuth] = useAuth()


  return (
    <Layout title={'AaMeRaa Best Offer'}>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default Home
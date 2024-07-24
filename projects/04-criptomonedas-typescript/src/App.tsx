import { useMemo, useState } from "react"
import { CryptoData } from "./types"
import Spinner from "./components/Spinner"
import Form from "./components/Form"
import DataDisplay from "./components/DataDisplay"

function App() {

  const [cryptoData, setCryptoData] = useState<CryptoData>({
    IMAGEURL: '',
    PRICE: '',
    HIGHDAY: '',
    LOWDAY: '',
    CHANGE24HOUR: '',
    LASTUPDATE: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  const hasResult = useMemo(() => (!Object.values(cryptoData).includes('')), [cryptoData])

  return (
    <>
      <h1>Criptomonedas</h1>
      <Form
        setLoading={setLoading}
        setCryptoData={setCryptoData}
      />
      {loading ? <Spinner /> : hasResult && <DataDisplay cryptoData={cryptoData} />}
    </>
  )
}

export default App

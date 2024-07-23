import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { currencies } from "./data/index"
import { CryptoCurrenciesResponseSchema, CryptoDataSchema } from "./schema/schema"
import { CryptoData, Pair } from "./types"
import Spinner from "./components/Spinner"
import Form from "./components/Form"

function App() {

  const [cryptoData, setCryptoData] = useState<CryptoData>({
    IMAGEURL: '',
    PRICE: '',
    HIGHDAY: '',
    LOWDAY: '',
    CHANGE24HOUR: '',
    LASTUPDATE: ''
  })
  const [loading, setLoading] = useState(false)

  const hasResult = useMemo(() => (!Object.values(cryptoData).includes('')), [cryptoData])

  return (
    <>
      <h1>Criptomonedas</h1>
      <Form
        setLoading={setLoading}
        setCryptoData={setCryptoData}
      />

      { loading ? <Spinner /> : hasResult && (
        <>
          <div className="wraper-resultado">
            <h2>Cotizacion</h2>

            <div className="resultado">
              <div className="imagen">
                <img
                  src={`https://cryptocompare.com/${cryptoData.IMAGEURL}`}
                  alt="Imagen cryptomoneda"
                />
              </div>
              <p>El precio es de: <span>{cryptoData.PRICE}</span></p>
              <p>El precio mas alto del dia: <span>{cryptoData.HIGHDAY}</span></p>
              <p>El precio mas bajo del dia: <span>{cryptoData.LOWDAY}</span></p>
              <p>Variacion ultimas 24 horas: <span>{cryptoData.CHANGE24HOUR}</span></p>
              <p>Ultima vez que se actualizo: <span>{cryptoData.LASTUPDATE}</span></p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default App

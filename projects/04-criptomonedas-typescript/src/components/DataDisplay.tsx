
export default function DataDisplay({ cryptoData }) {

  return (
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
  )
}

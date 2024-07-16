import { currencies } from "./data/index"

function App() {


  return (
    <>
      <h1>Criptomonedas</h1>
      <form>
        <div>
          <label htmlFor="currency">Moneda</label>
          <select
            name="currency"
            id="currency"
          >
            <option value="">-- Selecciona una Moneda --</option>
            {currencies.map(country => (
              <option
                key={country.code}
                value={country.name}
                >
                  {country.name}
                </option>
            ))}
            </select>
        </div>
        <div>
          <label htmlFor="cripto-currency">Criptomoneda</label>
          <select
            name="cripto-currency"
            id="cripto-currency"
          >
            <option value="">-- Selecciona una Criptomoneda --</option>
          </select>
        </div>

        <input type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default App

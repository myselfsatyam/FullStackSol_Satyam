import { useState } from 'react'
import { useCountry } from './hooks'

const App = () => {
  const [name, setName] = useState('')
  const { country, found } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={name} onChange={fetch} />
      </form>
      <div>
        {found ? (
          <div>
            <h3>{country.name.common} </h3>
            <div>capital {country.capital} </div>
            <div>population {country.population}</div> 
            <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
          </div>
        ) : (
          <div>
            not found...
          </div>
        )}
      </div>
    </div>
  )
}

export default App 
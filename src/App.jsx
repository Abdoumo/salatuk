import { createContext, useState, useEffect } from 'react'
import './App.css'
import API from './component/API';
import PRAYERTIME from './component/PRAYERTIME';

export const AppContext = createContext(null)

function App() {
  const [ data, setData ] = useState('')

  return (
    <>
    <div className="App">
        <AppContext.Provider value={{ data, setData }}>
              <API />
              <PRAYERTIME />
        </AppContext.Provider>
    </div>
  </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./main.css"
import Os from "./Os"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Os></Os>
  </StrictMode>,
)

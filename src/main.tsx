import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import './index.css'

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} render={render}>
      <App />
    </Wrapper>
  </React.StrictMode>,
)

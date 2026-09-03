import { RouterProvider } from 'react-router'
import './App.css'
import router from './routes/router'
import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <SmoothScroll>
      <RouterProvider router={router} />
    </SmoothScroll>
  )
}

export default App

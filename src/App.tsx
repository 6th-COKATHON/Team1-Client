import { Routes, Route } from 'react-router-dom'
import { Home } from '@pages/Home'
import { Layout } from '@components/layouts/Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default App

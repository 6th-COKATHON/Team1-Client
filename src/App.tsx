import { Routes, Route } from 'react-router-dom'
import { Home } from '@pages/Home'
import { Layout } from '@components/layouts/Layout'
import { WriteNag } from '@pages/WriteNag'
import { ShowNag } from '@pages/ShowNag'
import { CategoryDetail } from '@pages/CategoryDetail'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/showNag/:id" element={<ShowNag />} />
        <Route path="/writeNag" element={<WriteNag />} />
        <Route path="/categoryNag" element={<CategoryDetail />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  )
}

export default App

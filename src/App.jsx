import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar3 from './components/Navbar/Navbar3'

const App = () => {
  return (
      <Router>
        <Navbar3/>
        <Routes>
          <Route path='/' element = {<Homepage/> } />
        </Routes>
      </Router> 
  )
}
export default App
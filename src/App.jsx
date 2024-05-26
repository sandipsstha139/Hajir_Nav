import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element = {<Homepage/> } />
        </Routes>
      </Router> 
  )
}
export default App
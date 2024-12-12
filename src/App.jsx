// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import GigsPage from './Pages/GigsPage'
import SchedulerPage from './Pages/SchedulerPage'
import PaymentPage from './Pages/PaymentPage'
import TransactionPage from "./Pages/TransactionPage.jsx";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/gigs" element={<GigsPage/>}/>
        <Route path="/schedule" element={<SchedulerPage/>}/>
        <Route path="/pay" element={<PaymentPage/>}/>
        <Route path="/transaction" element={<TransactionPage/>}/>
      </Routes>
    </Router>
  )
  

}

export default App

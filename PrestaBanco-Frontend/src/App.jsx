import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import UserList from './components/UserList'
import AddUser from "./components/AddEditUser"
import AddSimulate from './components/AddSimulate'
import RegisterList from './components/RegisterList'
import RequestCredit from './components/RequestDocument'
import AddCredit from './components/AddCredit'
import CreditList from './components/CreditList'
import CreditEvaluationList from './components/CreditEvaluationList'
import AddCreditEvaluation from './components/AddCreditEvaluation'
import ModifyStatus from './components/ModifiedStatus'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className = "container">
          <Routes>  
            <Route path="/" element={<Home />} />
            <Route path="/user/list" element = {<UserList />} />
            <Route path="/user/add" element = {<AddUser />} />
            <Route path="/user/edit/:id" element = {<AddUser />} />
            <Route path="/simulate/add" element = {<AddSimulate />} />
            <Route path="/register/list" element = {<RegisterList />} />
            <Route path="/request-credit/:userId" element = {<AddCredit />} />
            <Route path="/upload-documents/:creditId/:crediType" element = {<RequestCredit />} />
            <Route path="/user/:userId/credits" element = {<CreditList />} />
            <Route path="/executive" element = {<CreditEvaluationList />} />
            <Route path="/executive/creditEvaluation" element = {<AddCreditEvaluation />} />
            <Route path="/executive/status/:creditId" element = {<ModifyStatus />} />
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App

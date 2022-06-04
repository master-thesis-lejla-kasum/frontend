import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from './components/Home/Home';
import VaccineRegistration from './components/VaccineRegistration/VaccineRegistration';

function App() {

  const BASE_URL = "http://localhost:8081";

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path="/vaccine-registration" element={<VaccineRegistration baseUrl={BASE_URL} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

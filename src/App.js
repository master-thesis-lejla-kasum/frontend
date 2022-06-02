import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from './components/Home/Home';
import VaccineRegistration from './components/VaccineRegistration/VaccineRegistration';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path="/vaccine-registration" element={<VaccineRegistration />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

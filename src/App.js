import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from './components/Home/Home';
import VaccineRegistration from './components/VaccineRegistration/VaccineRegistration';
import TestRegistration from './components/TestRegistration/TestRegistration';
import Registration from './components/Registration/Registration';

function App() {

  const COVID_BASE_URL = "http://localhost:8081";
  const AUTH_BASE_URL = "http://localhost:8080"

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}></Route>

          <Route
            path="/vaccine-registration"
            element={<VaccineRegistration
              covidBaseUrl={COVID_BASE_URL}
              authBaseUrl={AUTH_BASE_URL}
            />}
          >
          </Route>

          <Route
            path="/test-registration"
            element={<TestRegistration
              covidBaseUrl={COVID_BASE_URL}
              authBaseUrl={AUTH_BASE_URL}
            />}
          >
          </Route>

          <Route
            path="/register"
            element={<Registration authBaseUrl={AUTH_BASE_URL} />}
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

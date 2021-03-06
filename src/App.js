import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from './components/Home/Home';
import VaccineRegistration from './components/VaccineRegistration/VaccineRegistration';
import TestRegistration from './components/TestRegistration/TestRegistration';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import StaticInfoPage from './components/StaticContent/StaticInfoPage';
import staticData from "./util/staticData";
import Info from './components/Info/Info';
import SingleInfo from './components/SingleInfo/SingleInfo';
import AdminInstitution from './components/AdminInstitution/AdminInstitution';
import CovidArticleForm from './components/CovidPanel/CovidArticleForm';
import CovidStatisticForm from './components/CovidPanel/CovidStatisticForm';
import CovidApplication from './components/CovidPanel/CovidApplication';
import Statistic from './components/Statistic/Statistic';

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

          <Route
            path="/login"
            element={<Login authBaseUrl={AUTH_BASE_URL} />}
          >
          </Route>

          <Route
            path="/covid-info"
            element={<StaticInfoPage title={staticData[0].title} date={staticData[0].date} content={staticData[0].content} />}
          >
          </Route>

          <Route
            path="/test-info"
            element={<StaticInfoPage title={staticData[1].title} date={staticData[1].date} content={staticData[1].content} />}
          >
          </Route>

          <Route
            path="/vacc-info"
            element={<StaticInfoPage title={staticData[2].title} date={staticData[2].date} content={staticData[2].content} />}
          >
          </Route>
          <Route
            path="/info"
            element={<Info covidBaseUrl={COVID_BASE_URL} />}
          >
          </Route>
          <Route
            path="/info/:id"
            element={<SingleInfo covidBaseUrl={COVID_BASE_URL} />}
          >
          </Route>

          <Route
            path="/admin/institution"
            element={<AdminInstitution authBaseUrl={AUTH_BASE_URL} />}
          >
          </Route>

          <Route
            path="/institution/article"
            element={<CovidArticleForm covidBaseUrl={COVID_BASE_URL} />}
          >
          </Route>

          <Route
            path="/institution/statistic"
            element={<CovidStatisticForm covidBaseUrl={COVID_BASE_URL} />}
          >
          </Route>

          <Route
            path="/institution/application"
            element={<CovidApplication covidBaseUrl={COVID_BASE_URL} />}
          >
          </Route>

          <Route
            path="/statistic"
            element={<Statistic covidBaseUrl={COVID_BASE_URL} />}
          >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

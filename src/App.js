import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Home from './components/Home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Header from './infrastructure/components/Header/Header';
import { Home } from './infrastructure/views/index';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Header from './infrastructure/components/Header/Header';
import { Home, PodcastDetail } from './infrastructure/views/index';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
        <Route path="/podcast/:id/episode/:episodeId" element={<PodcastDetail />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;

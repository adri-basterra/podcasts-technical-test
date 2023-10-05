import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClient } from "react-query";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Header from './components/Header/Header';
import { Home, PodcastDetail } from './pages/index';

function App() {
  const aDayInMiliseconds = 24 * 60 * 60 * 1000;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: aDayInMiliseconds,
        cacheTime: aDayInMiliseconds,
      },
    },
  });

  const persister = createSyncStoragePersister({
    storage: window.localStorage,
  })

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:id" element={<PodcastDetail />} />
          <Route path="/podcast/:id/episode/:episodeId" element={<PodcastDetail />} />
        </Routes>
      </BrowserRouter >
    </PersistQueryClientProvider >
  );
}

export default App;

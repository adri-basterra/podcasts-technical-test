import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import { Header } from './components';
import { Home, PodcastDetail } from './pages';
import { QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

function App() {

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast/:id" element={<PodcastDetail />} />
            <Route path="/podcast/:id/episode/:episodeId" element={<PodcastDetail />} />
          </Routes>
        </BrowserRouter >
      </QueryClientProvider>
    </PersistQueryClientProvider >
  );
}

export default App;

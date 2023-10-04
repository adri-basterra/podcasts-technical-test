import { Home } from './infrastructure/views/index';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './infrastructure/components/Header/Header';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

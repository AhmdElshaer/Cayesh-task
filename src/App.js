import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider, useSelector } from 'react-redux'
import "./index.css";
import Auth from "./pages/Auth";
import NomineeSelection from "./pages/NomineeSelection";
import { store } from "./store/store";
import { checkAuthLoader } from "./services/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>,
  },
  {
    path: '/selection',
    element: <NomineeSelection />,
    loader: checkAuthLoader
  }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

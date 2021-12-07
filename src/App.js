import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { AppContext, Provider } from "./context/Provider";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { useContext } from "react";

export const App = () => {


  return (
    <Provider>

      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:user/" element={<Profile />} />
          <Route path="/:user/:regalo" element={<Profile />} />
        </Routes>
      </BrowserRouter>

    </Provider>
  )
}

export default App

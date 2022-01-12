import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import TV from "./pages/Top";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="" element={<Home />} />
          <Route path="movies">
            <Route path="" element={<Search />} />
            <Route path=":id" element={<Home />} />
            <Route path="top" element={<TV />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

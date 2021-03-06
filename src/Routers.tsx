import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import TV from "./pages/TV";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="" element={<Home />} />
          <Route path="movies" element={<Home />}>
            <Route path="" element={<Search />} />
            <Route path="toprated/:id" element={<Home />} />
            <Route path="nowplaying/:id" element={<Home />} />
          </Route>
          <Route path="tv" element={<TV />}>
            <Route path="popular/:id" element={<TV />} />
            <Route path="onair/:id" element={<TV />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

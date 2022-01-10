import React from "react";
import { HelmetProvider } from "react-helmet-async";
import Routers from "./Routers";

function App() {
  return (
    <HelmetProvider>
      <Routers />
    </HelmetProvider>
  );
}

export default App;

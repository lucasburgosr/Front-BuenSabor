import React from "react";
import AppRouter from "../src/routes/AppRouter";
import { empleadoSlice } from "./redux/slices/slicesUnificados";

const App: React.FC = () => {
  return (
    <div style={{width: "100%"}} >
      <AppRouter></AppRouter>
    </div>
  );
};

export default App;

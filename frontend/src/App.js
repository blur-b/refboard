import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter , Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    );
  }

export default App;
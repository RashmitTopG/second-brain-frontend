import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import DashBoard from "./pages/DashBoard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path = "/" element= {<Landing/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

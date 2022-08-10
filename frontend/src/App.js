import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import SignUp from "./Components/Authentication/SignUp";
import SignIn from "./Components/Authentication/SignIn";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Transaction from "./pages/Transaction.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/ui/Header.jsx";

function App() {

  const authUser = true;
  return (
    <>
    {authUser && <Header/>}
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/transaction/:id" element={<Transaction />} />
      <Route path="*" element={<NotFound />} />
     </Routes>
    </>
  )
}

export default App

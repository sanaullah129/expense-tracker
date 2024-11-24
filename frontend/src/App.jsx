import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Transaction from "./pages/Transaction.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/ui/Header.jsx";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/queries/user.query.js";
import { Toaster } from "react-hot-toast";

function App() {
  const { loading, data } = useQuery(GET_AUTH_USER);

  if(loading) return "Loading...";

  return (
    <>
      {data?.authUser && <Header />}
			<Routes>
        {console.log(data)}
				<Route path='/' element={data.authUser ? <Home /> : <Navigate to='/login' />} />
				<Route path='/login' element={!data.authUser ? <Login /> : <Navigate to='/' />} />
				<Route path='/signup' element={!data.authUser ? <SignUp /> : <Navigate to='/' />} />
				<Route
					path='/transaction/:id'
					element={data.authUser ? <Transaction /> : <Navigate to='/login' />}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Toaster />
    </>
  );
}

export default App;

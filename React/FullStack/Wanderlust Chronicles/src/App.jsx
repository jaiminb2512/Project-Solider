import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Create from "./pages/Create"
import View from "./pages/View"
import { useContext } from "react"; 
import { AuthContext } from "./authContext"; 
import Navbar from "./pages/Navbar";
import Edit from './pages/Edit'

function App() { 

const { user } = useContext(AuthContext); 

const ProtectedRoute = ({ children }) => { 
	if (!user) { 
	return <Login/>; 
	} else { 
	return children; 
	} 
}; 

return ( 
	<BrowserRouter> 
	<Navbar />
	<Routes> 
		<Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
		<Route path="/login" element={<Login/>} /> 
		<Route path="/register" element={<Register/>} /> 
		<Route path="/create" element={<ProtectedRoute><Create/></ProtectedRoute>} /> 
		<Route path="/view/:id" element={<ProtectedRoute><View/></ProtectedRoute>} /> 
		<Route path="/edit/:id" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
	</Routes> 
	</BrowserRouter> 
); 
} 

export default App; 

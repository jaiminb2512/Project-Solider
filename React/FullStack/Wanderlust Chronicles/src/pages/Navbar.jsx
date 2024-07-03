import '../style/navbar.css'
import { useContext } from 'react'; 
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext"


const Navbar = () => { 

	const navigate = useNavigate() 

	const { user, dispatch } = useContext(AuthContext) 
	const handleClick = async (e) => { 
		e.preventDefault(); 
		dispatch({ type: "LOGOUT" }); 
		navigate("/") 
	} 



	return ( 
		<div className='navContainer' > 
			<Link to="/"> 
				<p className='navLogo cwhite'>Wanderlust Chronicles</p> 
			</Link> 

			<input type="checkbox" id='menu-bar' /> 
			<label htmlFor="menu-bar"> 
				<FontAwesomeIcon icon={faBars} className="icon" /> 
			</label> 
			<nav className='navbar'> 
				<ul> 
					<Link to="/"> 
						<li><p className='cwhite'>Home</p></li> 
					</Link> 
					<Link to="/create"> 
						<li><p className='cwhite'>Create</p></li> 
					</Link> 
					{user ? (<> 

						<li onClick={handleClick} style={{ cursor: "pointer" }}> 
							<p className='cwhite'>Logout</p> 
						</li> 
						<li><div className="profilePicture"> 
							<img src={user.profilePicture || 
								"https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="" /> 
						</div></li> 
						<li id="usernamename"><p className='cwhite'>{user.username}</p></li> 

					</> 
					) 
						: 
						( 
							<> 
								<Link to="/register"> 
									<li><p className='cwhite'>Register</p></li> 
								</Link> 
								<Link to="/login"> 
									<li><p className='cwhite'>Login</p></li> 
								</Link> 
							</> 
						)} 
				</ul> 
			</nav> 
		</div > 
	) 
} 

export default Navbar


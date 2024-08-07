import Link from "next/link"
import LogoutForm from "./logoutForm"
import { getSession } from "@/actions"

const Navbar = async () => {

  const session = await getSession()
  // console.log(session)

  return (
  <nav>
    <Link href='/'>Homepage</Link>
    <Link href='/premium'>Premium</Link>
    <Link href='/profile'>Profile</Link>
    <Link href='/login'>Login</Link>
    { session.isLoggedIn && <LogoutForm classname="button" />}
  </nav>
  )
}

export default Navbar
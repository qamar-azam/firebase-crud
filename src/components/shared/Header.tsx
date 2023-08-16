
import { Link } from 'react-router-dom';
import { useAuthState } from '../contexts/UserContext';
import { SignInButton } from '../domain/auth/SignInButton';
import { SignOutButton } from '../domain/auth/SignOutButton';
import { SignUpButton } from '../domain/auth/SignUpButton';
import { useLocation } from "react-router-dom"



function Header() {
    const userAuth =   useAuthState();
    const user = userAuth?.user;
    let location = useLocation();

    return (
        <>
            <nav className="p-4 mb-20 flex items-center justify-between">
                <Link to="/" className="text-slate-100 text-xl text-bold">Tool App</Link>

                {user ? <SignOutButton /> : location.pathname === "/signin" ? <SignUpButton /> : <SignInButton />}



            </nav>
        </>
    )
}

export default Header;
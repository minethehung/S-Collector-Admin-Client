import logo from '../assets/app_logo.png';
import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus == null) {
        window.location.href = '/login';
    }
    return (
        <div className="container-fluid m-0 p-0">
            <div className="row vh-100 m-0 p-0">
                <nav className="col-md-3 col-lg-2 d-md-block bg-white sidebar pe-0">
                    <a className="navbar-brand m-3" href="#">
                        <img src={logo} alt="Your Logo" width="190" className="mt-5 mb-5" />
                    </a>
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            <NavLink to="/" className="nav-link">
                                {({ isActive }) => (
                                    <li className={isActive ? "nav-item active" : "nav-item"}>

                                        <i className="fa-solid fa-house"></i> Dashboard

                                    </li>
                                )}
                            </NavLink>
                            <NavLink to="/sellers" className="nav-link">
                                {({ isActive }) => (
                                    <li className={isActive ? "nav-item active" : "nav-item"}>

                                        <i className="fa-solid fa-user"></i> Seller

                                    </li>
                                )}
                            </NavLink>
                            <NavLink to="/stores" className="nav-link">
                                {({ isActive }) => (
                                    <li className={isActive ? "nav-item active" : "nav-item"}>

                                        <i className="fa-solid fa-store"></i> Store

                                    </li>
                                )}
                            </NavLink>
                            <NavLink to="/orders" className="nav-link">
                                {({ isActive }) => (
                                    <li className={isActive ? "nav-item active" : "nav-item"}>

                                        <i className="fa-solid fa-clipboard"></i> Order

                                    </li>
                                )}
                            </NavLink>
                            <NavLink to="/posts" className="nav-link">
                                {({ isActive }) => (
                                    <li className={isActive ? "nav-item active" : "nav-item"}>

                                        <i className="fa-solid fa-file-lines"></i> Post

                                    </li>
                                )}
                            </NavLink>

                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 bg-light" role="main">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
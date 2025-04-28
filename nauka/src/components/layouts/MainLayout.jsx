import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"

const MainLayout = () => {
    const [user] = useState();
    return (
        <>
            <div className="flex space-between">To jest nagłówek
                {user ? (
                    <>
                        <NavLink to="">Home</NavLink>
                        <NavLink to="/products">Produkty</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Logowanie</NavLink>
                        <NavLink to="/register">Rejestracja</NavLink>
                    </>
                )}
            </div>
            <Outlet />
            <footer>Stopka</footer>
        </>
    )
}

export default MainLayout;
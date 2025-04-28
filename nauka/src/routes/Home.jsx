import { Link, NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Witaj</h1>
            <p>Strona głowna</p>
            <Link to="/login">Logowanie</Link>
            <NavLink to="/register">Rejestracja</NavLink>
            <Link to="/products">Lista produktów</Link>
        </div>
    )
}
export default HomePage;
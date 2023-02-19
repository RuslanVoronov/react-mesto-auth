import logo from '../image/Logo.svg';

function Header({ children }) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            {children}
        </header>
    );
}
export default Header;
import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
    return (
        <nav>
            <NavLink to="/signin">Войти</NavLink>
            <NavLink to="/signup">Регистрация</NavLink>
            <NavLink to="/logged">Карточки</NavLink>
        </nav>
    )
}
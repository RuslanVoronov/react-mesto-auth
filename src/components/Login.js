import React from "react"
import { useForm } from "../hooks/useForm";
import Header from "./Header";
import { Link } from "react-router-dom";

export function Login({ handleLoggedIn, onLogin }) {
    const { values, handleChange, setValues } = useForm({
        email: "",
        password: "",
    })

    function handleSubmit(e) {
        e.preventDefault();
        handleLoggedIn(values.email)
        onLogin(values)
    }

    return (
        <>
            <Header>
                <Link to="/signup" className="header__menu-item">Регистрация</Link>
            </Header>
            <section className="authorization">
                <h2 className="authorization__title">Вход</h2>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <input className="authorization__input authorization__input_type_email" value={values.email || ''} name='email' onChange={handleChange} minLength="2"
                        maxLength="40" placeholder="Email" required />

                    <input className="authorization__input authorization__input_type_password" value={values.password || ''} name='password' onChange={handleChange} minLength="2"
                        maxLength="200" type="password" placeholder="Пароль" required />
                    <button className="authorization__submit" type="submit">Войти</button>
                </form>
            </section>
        </>
    )
}
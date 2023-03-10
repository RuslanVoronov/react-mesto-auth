import React from "react"
import { useForm } from "../hooks/useForm";
import Header from "./Header";
import { Link } from "react-router-dom";

export function Register({ onRegister }) {
    const { values, handleChange, setValues } = useForm({})

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(values)
    }

    return (
        <>
            <Header>
                <Link to="/signin" className="header__menu-item">Войти</Link>
            </Header>
            <section className="authorization">
                <h2 className="authorization__title">Регистрация</h2>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <input className="authorization__input authorization__input_type_email" value={values.email || ''} name='email' onChange={handleChange} minLength="2"
                        maxLength="40" placeholder="Email" required />

                    <input className="authorization__input authorization__input_type_password" value={values.password || ''} name='password' onChange={handleChange} minLength="2"
                        type="password" maxLength="200" placeholder="Пароль" required />
                    <button className="authorization__submit" type="submit">Зарегистрироваться</button>
                </form>
                <p className="authorization__extra-text">Уже зарегистрированы? <Link className="authorization__link" to="/signin">Войти</Link></p>
            </section>
        </>
    )
}
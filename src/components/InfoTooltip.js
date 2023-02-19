import React from "react";
import Success from "../image/Success.svg";
import Error from "../image/Error.svg";

export function InfoToolTip({ isOpen, isRegisterSucces, onClose }) {
    return (
        <section className={`${isOpen ? 'popup popup_opened' : 'popup'}`}>
            <div className="popup__content">
                <img src={isRegisterSucces ? Success : Error} />
                <button onClick={onClose} className="popup__close-button" type="button"></button>
                <h2 className="popup__title">{isRegisterSucces ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </section>
    )
}
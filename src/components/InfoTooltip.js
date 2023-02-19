import React from "react";
import Success from "../image/Success.svg";
import Error from "../image/Error.svg";

export function InfoToolTip({ isOpen, isRegisterSucces, onClose, text }) {
    return (
        <section className={`${isOpen ? 'popup popup_opened' : 'popup'}`}>
            <div className="popup__content">
                <img src={isRegisterSucces ? Success : Error} />
                <button onClick={onClose} className="popup__close-button" type="button"></button>
                <h2 className="popup__title">{text}</h2>
            </div>
        </section>
    )
}
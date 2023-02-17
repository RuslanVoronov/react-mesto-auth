function PopupWithForm({ isOpen, onClose, name, title, buttonText, children, onSubmit }) {
    return (
        <section className={`${isOpen ? 'popup popup_opened' : 'popup'}`} id={`${name}-popup`}>
            <div className="popup__content">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" onSubmit={onSubmit} id={`${name}-form`} name={`${name}-form`}>

                    {children}

                    <button className="popup__save-button" id={`save-button-${name}`} type="submit"
                    >{buttonText}</button>
                </form>
                <button onClick={onClose} className="popup__close-button" type="button"></button>
            </div>
        </section>
    );
}
export default PopupWithForm;
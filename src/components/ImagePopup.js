function ImagePopup(props) {

    return (<section className={`${props.card ? 'popup popup_opened' : 'popup'}`} id="image-popup">
        <div className="image-popup__content">
            <img src={props.card?.link} alt={props.card?.name} className="image-popup__image" />
            <p className="image-popup__name">{props.card?.name}</p>
            <button onClick={props.onClose} className="popup__close-button" type="button"></button>
        </div>
    </section>);
}

export default ImagePopup
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ cardInfo, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(cardInfo);
    }

    function handleLikeClick() {
        onCardLike(cardInfo)
    }

    function handleCardDelete() {
        onCardDelete(cardInfo)
    }

    const isOwn = cardInfo.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = cardInfo.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `like__button ${isLiked && 'like__button_active'}`
    );;


    {/*  elements template */ }
    return (<div className="element">
        <img onClick={handleClick} src={cardInfo.link} alt={cardInfo.name} className="element__image" />
        {isOwn && <button className="element__trash-button" onClick={handleCardDelete} type="button" />}

        {/* <button className="element__trash-button" type="button"></button> */}
        <div className="element__description">
            <h2 className="element__title">{cardInfo.name}</h2>
            <div className="like">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                <h3 className="like__counter">{cardInfo.likes.length}</h3>
            </div>
        </div>
    </div>
    )
}
export default Card;
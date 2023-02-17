import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            {/*  profile */}
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__avatar">
                        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-image" />
                        <div onClick={props.onEditAvatar} className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-info__title">{currentUser.name}</h1>
                        <p className="profile-info__subtitle">{currentUser.about}</p>
                        <button onClick={props.onEditProfile} className="profile-info__edit-button" type="button"></button>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button"></button>
            </section>

            {/*  elements */}
            <section className="elements">
                {
                    props.cards.map((card) => {
                        return (
                            <Card
                                cardInfo={card}
                                onCardDelete={props.onCardDelete}
                                onCardLike={props.onCardLike}
                                onCardClick={props.onCardClick}
                                key={card._id}
                            />
                        )
                    })
                }
            </section>

        </main >
    );
}
export default Main;
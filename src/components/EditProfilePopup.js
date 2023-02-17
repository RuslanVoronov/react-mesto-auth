import { useForm } from "../hooks/useForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setValues(currentUser)
    }, [currentUser, props.isOpen]);

    const { values, handleChange, setValues } = useForm({})

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser(values);
    }

    return (
        <PopupWithForm
            name="profile" title="Редактировать профиль"
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit} >

            <input className="popup__input popup__input_type_name" value={values.name || ''} onChange={handleChange} id="name" name="name" minLength="2"
                maxLength="40" placeholder="Имя" required />
            <span className="popup__error" id="name-error"></span>

            <input className="popup__input popup__input_type_job" value={values.about || ''} onChange={handleChange} id="job" name="about" minLength="2"
                maxLength="200" placeholder="Род деятельности" required />
            <span className="popup__error" id="job-error"></span>

        </PopupWithForm>
    )
}

export default EditProfilePopup;
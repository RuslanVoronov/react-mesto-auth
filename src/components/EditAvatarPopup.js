import { useRef } from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
    const avatarRef = useRef()

    useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);

    }

    return (
        <PopupWithForm
            name="avatar" title="Обновить аватар"
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>

            <input ref={avatarRef} className="popup__input popup__input_type_avatar" id="avatar" name="avatar"
                placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
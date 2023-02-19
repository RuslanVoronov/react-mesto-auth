import PopupWithForm from "./PopupWithForm"
import { useForm } from "../hooks/useForm";

function AddPlacePopup(props) {

    const { values, handleChange, setValues } = useForm({})

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace(values);
        setValues({})
    }

    return (
        <PopupWithForm
            name="card" title="Новое место"
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>

            <input value={values.place || ''} onChange={handleChange} className="popup__input popup__input_type_place" id="place" name="place" minLength="2"
                maxLength="30" placeholder="Название" required />
            <span className="popup__error" id="place-error"></span>

            <input value={values.link || ''} onChange={handleChange} className="popup__input popup__input_type_link" id="link" name="link"
                placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup
import {
    ADD_CONTACT,
    EDIT_CONTACT,
    OPEN_CONTACT,
    DELETE_CONTACT,
    ADD_CONTACT_ITEM,
    CHANGE_CONTACT_ITEM_TYPE,
    CHANGE_CONTACT_ITEM_CONTENT,
    DELETE_CONTACT_ITEM,
    SAVE_CONTACT,
    CANCEL_EDITING_CONTACT,
    EDIT_NAME,
    EDIT_SURNAME,
    CLOSE_CONTACT
} from '../constants/actions' 

export const openContact = (id) => ({ type: OPEN_CONTACT, payload: {id} })
export const closeContact = () => ({ type: CLOSE_CONTACT })
export const editContact = (originalData) => ({ type: EDIT_CONTACT, payload: {originalData} })
export const cancelEditing = () => ({ type: CANCEL_EDITING_CONTACT })
export const saveEditing = () => ({ type: SAVE_CONTACT })
export const changeContactItemType = (type, index) => ({ type: CHANGE_CONTACT_ITEM_TYPE, payload: {type, index} })
export const changeContactItemContent = (content, index) => ({ type: CHANGE_CONTACT_ITEM_CONTENT, payload: {content, index} })
export const addContactItem = () => ({ type: ADD_CONTACT_ITEM })
export const deleteContactItem = (index) => ({ type: DELETE_CONTACT_ITEM, payload: {index} })
export const editName = (content, name) => ({ type: name === 'name' ? EDIT_NAME : EDIT_SURNAME, payload: {content} })
export const deleteContact = (id) => ({ type: DELETE_CONTACT, payload: {id} })
export const addContact = () => ({ type: ADD_CONTACT })
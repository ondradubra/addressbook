import {
    ADD_CONTACT,
    OPEN_CONTACT,
    DELETE_CONTACT,
    ADD_CONTACT_ITEM,
    CHANGE_CONTACT_ITEM_TYPE,
    CHANGE_CONTACT_ITEM_CONTENT,
    DELETE_CONTACT_ITEM,
    CANCEL_EDITING_CONTACT,
    EDIT_NAME,
    CLOSE_CONTACT,
    LOAD_DATA,
    UPDATE_ID
} from '../constants/actions' 

export const openContact = (id) => ({ type: OPEN_CONTACT, payload: {id} })
export const closeContact = () => ({ type: CLOSE_CONTACT })
export const cancelEditing = (data) => ({ type: CANCEL_EDITING_CONTACT, payload: {data} })
export const addContactItem = () => ({ type: ADD_CONTACT_ITEM })
export const addContact = () => ({ type: ADD_CONTACT })

export const changeContactItemType = (type, index) => ({ type: CHANGE_CONTACT_ITEM_TYPE, payload: {type, index} })
export const changeContactItemContent = (content, index) => ({ type: CHANGE_CONTACT_ITEM_CONTENT, payload: {content, index} })
export const deleteContactItem = (index) => ({ type: DELETE_CONTACT_ITEM, payload: {index} })

export const editName = (content, target) => ({ type: EDIT_NAME, payload: {content, target} })

export const deleteContact = (id) => ({ type: DELETE_CONTACT, payload: {id} })
export const loadData = (data) => ({ type: LOAD_DATA, payload: {data} })
export const updateId = (id) => ({ type: UPDATE_ID, payload: {id} })
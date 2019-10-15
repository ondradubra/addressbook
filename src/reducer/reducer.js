import {
    ADD_CONTACT,
    OPEN_CONTACT,
    DELETE_CONTACT,
    ADD_CONTACT_ITEM,
    CHANGE_CONTACT_ITEM_TYPE,
    CANCEL_EDITING_CONTACT,
    DELETE_CONTACT_ITEM,
    EDIT_NAME,
    CLOSE_CONTACT,
    CHANGE_CONTACT_ITEM_CONTENT,
    LOAD_DATA,
    UPDATE_ID
} from '../constants/actions' 
import produce from 'immer'
import {CONTACT_TYPES, NEWID} from '../constants/variables'

const initialState = {
    data: [],
    activeContact: null
}

export default function reducer(state = initialState, action) {
    const indexContact = state.data.findIndex((item) => item.id === state.activeContact)
    const indexItem = action.payload && action.payload.index
    const content = action.payload && action.payload.content
    const id = action.payload && action.payload.id
    const data = action.payload && action.payload.data

    switch (action.type) {
        case LOAD_DATA:
            return produce(state, (s) => {
                s.data = data
            })
        case OPEN_CONTACT:
            return produce(state, (s) => {
                s.activeContact = id
            })
        case CLOSE_CONTACT:
            return produce(state, (s) => {
                s.activeContact = null
            })
        case CANCEL_EDITING_CONTACT:
            const activeContactId = state.activeContact
            return produce(state, (s) => {
                if (activeContactId === NEWID) {
                    s.activeContact = null
                }
                s.data = data
            })
        case ADD_CONTACT_ITEM:
            return produce(state, (s) => {
                s.data[indexContact].contacts.push({type: Object.keys(CONTACT_TYPES)[0], content: ''})
            }) 
        case ADD_CONTACT:
                const newId = NEWID
                const newContact = {
                    id: newId,
                    name: '',
                    surname: '',
                    contacts: []
                }
                return produce(state, (s) => {
                    s.data.push(newContact)
                    s.activeContact = newId
                })
        case UPDATE_ID:
            const findNewItemIndex = state.data.findIndex((item) => item.id === NEWID)
            return produce(state, (s) => {
                s.data[findNewItemIndex].id = id
                s.activeContact = null
            }) 
        case DELETE_CONTACT:
            const newData = state.data.filter((item) => item.id !== id)
            return produce(state, (s) => {
                s.data = newData
            })
        case CHANGE_CONTACT_ITEM_TYPE:
            const type = action.payload.type
            return produce(state, (s) => {
                s.data[indexContact].contacts[indexItem].type = type
            })    
        case CHANGE_CONTACT_ITEM_CONTENT:
            return produce(state, (s) => {
                s.data[indexContact].contacts[indexItem].content = content
            }) 
        case DELETE_CONTACT_ITEM:
            const newContacts = state.data[indexContact].contacts.filter((item, index) => index !== indexItem)
            return produce(state, (s) => {
                s.data[indexContact].contacts = newContacts
            }) 
        case EDIT_NAME:
            return produce(state, (s) => {
                s.data[indexContact][action.payload.target] = content
            })   
        default:
            return state
    }
}
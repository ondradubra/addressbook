import {
    ADD_CONTACT,
    EDIT_CONTACT,
    OPEN_CONTACT,
    DELETE_CONTACT,
    ADD_CONTACT_ITEM,
    CHANGE_CONTACT_ITEM_TYPE,
    SAVE_CONTACT,
    CANCEL_EDITING_CONTACT,
    DELETE_CONTACT_ITEM,
    LOAD_DATA,
    EDIT_NAME,
    EDIT_SURNAME,
    CLOSE_CONTACT,
    SEARCH_CONTACTS,
    CHANGE_CONTACT_ITEM_CONTENT
} from '../constants/actions' 
import produce from 'immer'
import {CONTACT_TYPES} from '../constants/variables'

const defaultData = [
    {
        id: 1,
        name: "Ondrej",
        surname: "Dubravcik",
        contacts: [
            {
                type: "email",
                content: "ondrej.dubravcik@gmail.com"
            },
            {
                type: "phone",
                content: "775663720"
            },
        ]
    }
]

const generateNewId = (arr) => {
    let maxId = 0
    arr.forEach((item) => {
        if (item.id > maxId) maxId = item.id
    })
    console.log(arr)
    return maxId + 1
}

const initialState = {
    data: defaultData,
    activeContact: null,
    originalContactData: null,
    isEditingContact: false,
    isNewContact: false,
    originalData: null
}

export default function reducer(state = initialState, action) {
    const indexContact = state.data.findIndex((item) => item.id === state.activeContact)
    const indexItem = action.payload && action.payload.index
    const content = action.payload && action.payload.content
    const id = action.payload && action.payload.id
    const isNewContact = state.isNewContact

    switch (action.type) {
        case EDIT_CONTACT:
            const originalData = action.payload.originalData
            return produce(state, (s) => {
                s.isEditingContact = true
                s.originalData = originalData
            })
        case ADD_CONTACT:
                const newId = generateNewId(state.data)
                const newContact = {
                    id: newId,
                    name: '',
                    surname: '',
                    contacts: []
                }
                return produce(state, (s) => {
                    s.data.push(newContact)
                    s.activeContact = newId
                    s.isNewContact = false
                    s.isEditingContact = true
                })
        case CANCEL_EDITING_CONTACT:
            const clearEmptyData = state.data.filter((item) => item.id !== state.activeContact)
            return produce(state, (s) => {
                if (!isNewContact) { 
                    s.data[indexContact] = s.originalData
                } 
                if (clearEmptyData) { 
                    s.data = clearEmptyData
                }
                s.activeContact = null
                s.originalData = null
                s.isEditingContact = false
                s.isNewContact = false
            })
        case SAVE_CONTACT:
            return produce(state, (s) => {
                s.originalData = null
                s.isEditingContact = false
            })
        case OPEN_CONTACT:
            return produce(state, (s) => {
                s.activeContact = id
            })
        case DELETE_CONTACT:
            const newData = state.data.filter((item) => item.id !== id)
            return produce(state, (s) => {
                s.data = newData
            })
        case CLOSE_CONTACT:
            return produce(state, (s) => {
                s.activeContact = null
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
        case ADD_CONTACT_ITEM:
            return produce(state, (s) => {
                s.data[indexContact].contacts.push({type: CONTACT_TYPES[0], content: ''})
            })  
        case DELETE_CONTACT_ITEM:
            const newContacts = state.data[indexContact].contacts.filter((item, index) => index !== indexItem)
            return produce(state, (s) => {
                s.data[indexContact].contacts = newContacts
            }) 
        case EDIT_NAME:
            return produce(state, (s) => {
                s.data[indexContact].name = content
            })  
        case EDIT_SURNAME:
            return produce(state, (s) => {
                s.data[indexContact].surname = content
            })   
        default:
            return state
    }
}
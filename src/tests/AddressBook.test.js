import React from 'react';
import ReactDOM from 'react-dom';

import * as actions from '../actions/actions'
import reducer from '../reducer/reducer'

import * as types from '../constants/actions'
import {CONTACT_TYPES, NEWID} from '../constants/variables'

const data = [
    {
        id: 1,
        name: 'Name',
        surname: 'Surname',
        contacts: [],
    },
]

const initialState = {
    data: [],
    activeContact: null
}

const initialStateWithContact = {
    data: [
        {
            id: 1,
            name: 'Name',
            surname: 'Surname',
            contacts: [
                {
                    type: 'email',
                    content: 'email@email.com'
                }
            ] 
        }
    ],
    activeContact: 1
}

const initialStateWithContactNewId = {
    data: [
        {
            id: NEWID,
            name: 'Name',
            surname: 'Surname',
            contacts: [
                {
                    type: 'email',
                    content: 'email@email.com'
                }
            ] 
        }
    ],
    activeContact: NEWID
}

const newContact = {
    id: NEWID,
    name: '',
    surname: '',
    contacts: []
}

describe('redux actions', () => {
  it('should create an action to open specific ID', () => {
    const id = 1
    const expectedAction = {
      type: types.OPEN_CONTACT,
      payload: {id}  
    }
    expect(actions.openContact(id)).toEqual(expectedAction)
  })
  it('should create an action to close contact', () => {
    const expectedAction = {
      type: types.CLOSE_CONTACT,
    }
    expect(actions.closeContact()).toEqual(expectedAction)
  })
  it('should create an action to cancel editing', () => {
    const expectedAction = {
      type: types.CANCEL_EDITING_CONTACT,
      payload: {data} 
    }
    expect(actions.cancelEditing(data)).toEqual(expectedAction)
  })
  it('should create an action to add contact item', () => {
    const expectedAction = {
      type: types.ADD_CONTACT_ITEM,
    }
    expect(actions.addContactItem(data)).toEqual(expectedAction)
  })
  it('should create an action to change contact item type', () => {
    const type = Object.keys(CONTACT_TYPES)[0]
    const index = 0
    const expectedAction = {
      type: types.CHANGE_CONTACT_ITEM_TYPE,
      payload: {type, index} 
    }
    expect(actions.changeContactItemType(type, index)).toEqual(expectedAction)
  })
  it('should create an action to change contact item content', () => {
    const target = 'content'
    const value = 'content'
    const index = 0
    const expectedAction = {
      type: types.CHANGE_CONTACT_ITEM_CONTENT,
      payload: {value, target, index} 
    }
    expect(actions.changeContactItemContent(value, target, index)).toEqual(expectedAction)
  })
  it('should create an action to delete contact item', () => {
    const index = 0
    const expectedAction = {
      type: types.DELETE_CONTACT_ITEM,
      payload: {index} 
    }
    expect(actions.deleteContactItem(index)).toEqual(expectedAction)
  })
  it('should create an action to edit name/surname', () => {
    const target = 'name'
    const content = 'My Name' 
    const expectedAction = {
      type: types.EDIT_NAME,
      payload: {content, target} 
    }
    expect(actions.editName(content, target)).toEqual(expectedAction)
  })
  it('should create an action to delete whole contact', () => {
    const id = 1
    const expectedAction = {
      type: types.DELETE_CONTACT,
      payload: {id} 
    }
    expect(actions.deleteContact(id)).toEqual(expectedAction)
  })
  it('should create an action to loading data', () => {
    const expectedAction = {
      type: types.LOAD_DATA,
      payload: {data} 
    }
    expect(actions.loadData(data)).toEqual(expectedAction)
  })
  it('should create an action to update ID for new record', () => {
    const id = 1
    const expectedAction = {
      type: types.UPDATE_ID,
      payload: {id} 
    }
    expect(actions.updateId(id)).toEqual(expectedAction)
  })
})

describe('redux reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })
    it('should handle OPEN_CONTACT', () => {
        const id = 1
        expect(
          reducer(initialState, {
            type: types.OPEN_CONTACT,
            payload: {id}
          })
        ).toEqual(
          {
            data: [],
            activeContact: id
          }
        )
    })
    it('should handle LOAD_DATA', () => {
        const id = 1
        expect(
          reducer(initialState, {
            type: types.LOAD_DATA,
            payload: {data}
          })
        ).toEqual(
          {
            data,
            activeContact: null
          }
        )
    })
    it('should handle CLOSE_CONTACT', () => {
        expect(
          reducer(initialState, {
            type: types.CLOSE_CONTACT,
          })
        ).toEqual(
          {
            data: [],
            activeContact: null
          }
        )
    })
    it('should handle CLOSE_CONTACT', () => {
        expect(
          reducer(initialState, {
            type: types.CLOSE_CONTACT,
          })
        ).toEqual(
          {
            data: [],
            activeContact: null
          }
        )
    })

    it('should handle ADD_CONTACT_ITEM', () => {
        expect(
          reducer(initialStateWithContact, {
            type: types.ADD_CONTACT_ITEM,
          })
        ).toEqual(
            {
                data: [
                    {
                        id: 1,
                        name: 'Name',
                        surname: 'Surname',
                        contacts: [
                            {
                                type: 'email',
                                content: 'email@email.com'
                            },
                            {
                                type: CONTACT_TYPES[0],
                                content: ''
                            }
                        ] 
                    }
                ],
                activeContact: 1
            }
        )
    })

    it('should handle ADD_CONTACT', () => {
        expect(
          reducer(initialStateWithContact, {
            type: types.ADD_CONTACT,
          })
        ).toEqual(
            {
                data: [
                    {
                        id: 1,
                        name: 'Name',
                        surname: 'Surname',
                        contacts: [
                            {
                                type: 'email',
                                content: 'email@email.com'
                            }
                        ] 
                    },
                    newContact
                ],
                activeContact: NEWID
            }
        )
    })

    it('should handle UPDATE_ID', () => {
        const id = 1
        expect(
          reducer(initialStateWithContactNewId, {
            type: types.UPDATE_ID,
            payload: {id}
          })
        ).toEqual(
            {
                data: [
                    {
                        id,
                        name: 'Name',
                        surname: 'Surname',
                        contacts: [
                            {
                                type: 'email',
                                content: 'email@email.com'
                            }
                        ] 
                    }
                ],
                activeContact: null
            }
        )
    })
    it('should handle DELETE_CONTACT', () => {
        const id = 1
        expect(
          reducer(initialStateWithContact, {
            type: types.DELETE_CONTACT,
            payload: {id}
          })
        ).toEqual(
            {
                data: [],
                activeContact: null
            }
        )
    })
    it('should handle CHANGE_CONTACT_ITEM_TYPE', () => {
        const type = 'phone'
        const index = 0
        expect(
          reducer(initialStateWithContact, {
            type: types.CHANGE_CONTACT_ITEM_TYPE,
            payload: {type, index}
          })
        ).toEqual(
            {
                data: [
                    {
                        id: 1,
                        name: 'Name',
                        surname: 'Surname',
                        contacts: [
                            {
                                type: 'phone',
                                content: ''
                            }
                        ] 
                    }
                ],
                activeContact: 1
            }
        )
    })

    it('should handle CHANGE_CONTACT_ITEM_CONTENT', () => {
        const target = 'content'
        const value = 'a@a.cz'
        const index = 0
        expect(
          reducer(initialStateWithContact, {
            type: types.CHANGE_CONTACT_ITEM_CONTENT,
            payload: {value, target, index}
          })
        ).toEqual(
            {
                data: [
                    {
                        id: 1,
                        name: 'Name',
                        surname: 'Surname',
                        contacts: [
                            {
                                type: 'email',
                                content: 'a@a.cz'
                            }
                        ] 
                    }
                ],
                activeContact: 1
            }
        )
    })

    it('should handle DELETE_CONTACT_ITEM', () => {
        const index = 0
        expect(
          reducer(initialStateWithContact, {
            type: types.DELETE_CONTACT_ITEM,
            payload: {index}
          })
        ).toEqual(
            {
                data: [
                    {
                        id: 1,
                        name: 'Name',
                        surname: 'Surname',
                        contacts: [] 
                    }
                ],
                activeContact: 1
            }
        )
    })

    it('should handle EDIT_NAME name', () => {
        const content = 'New Name'
        const target = 'name'
        expect(
          reducer(initialStateWithContact, {
            type: types.EDIT_NAME,
            payload: {content, target}
          })
        ).toEqual(
            {
                data: [
                    {
                        id: 1,
                        name: 'New Name',
                        surname: 'Surname',
                        contacts: [
                            {
                                type: 'email',
                                content: 'email@email.com'
                            }
                        ]
                    }
                ],
                activeContact: 1
            }
        )
    })
    it('should handle EDIT_NAME surname', () => {
        const content = 'New Surname'
        const target = 'surname'
        expect(
          reducer(initialStateWithContact, {
            type: types.EDIT_NAME,
            payload: {content, target}
          })
        ).toEqual(
            {
                data: [
                    {
                        id: 1,
                        name: 'Name',
                        surname: 'New Surname',
                        contacts: [
                            {
                                type: 'email',
                                content: 'email@email.com'
                            }
                        ]
                    }
                ],
                activeContact: 1
            }
        )
    })

})


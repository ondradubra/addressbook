import React, {Component} from 'react'
import fetch from 'isomorphic-fetch';

import {CONTACT_TYPES, CONTACT_TYPES_TRANSLATE, CONTACT_TYPES_CONTENT, API, NEWID, isAnyContactEmpty} from '../constants/variables'
import {ContactItem} from './ContactItem'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/actions'

let backupData = null

class AddressBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            isLoading: true
        }
    }

    componentDidMount() {
         this.loadData()   
    }

    loadData = () => {
        const {actions} = this.props
        fetch(`${API}/get.php`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server")
                }
                return response.json()
            }).then((data) => this.setState({isLoading: false }, () => { actions.loadData(data) }))  

    }

    findContactDataById = () => {
        const {activeContactId, data} = this.props
        return data.find((item) => item.id === activeContactId)
    }
    cancelEditing = () => {
        const {actions} = this.props
        this.setState({editMode: false}, () => {
            actions.cancelEditing(backupData)
            backupData = null
        })
    }
    saveExistingContact = (data) => {
        backupData = null
        this.setState({editMode: false}, async () => {
            const id = data.id
            try {
                await fetch(`${API}/put.php?id=${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
            }
            catch (err) {
                console.error('request failed', err);
            }
        })
    }
    saveNewContact = (data) => {
        const {actions} = this.props
        backupData = null
        this.setState({editMode: false}, async () => {
            try {
                await fetch(`${API}/post.php`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }).then((response) => {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server")
                    }
                    return response.json()
                }).then((data) => actions.updateId(String(data.id)))  
            }
            catch (err) {
                console.error('request failed', err);
            }
        })
    }
    editCard = (contactData) => {
        const {actions} = this.props
        
        return (
            <div className='AddressBook__card__content'>
                <h2>Edit contact</h2>
                <div className='formRow'>
                    <label>
                        <span className='formRow__label'>First name</span>
                        <input
                            type="text"
                            name="name"
                            value={contactData.name}
                            className='input'
                            onChange={(e) => actions.editName(e.target.value, e.target.name)}
                        />
                    </label>
                </div>
                <div className='formRow'>
                    <label>
                        <span className='formRow__label'>Last name</span>
                        <input
                            type="text"
                            name="surname"
                            value={contactData.surname}
                            className='input'
                            onChange={(e) =>  actions.editName(e.target.value, e.target.name)}
                        />
                    </label>
                </div>
                <ul className='AddressBook__card__contacts'>
                    {contactData.contacts.map((contactItem, index) => 
                        <div className='formRow' key={`edit-contactItem${index}`}>
                            <select onChange={(e) => actions.changeContactItemType(e.target.value, index)} value={contactItem.type}>
                                {CONTACT_TYPES.map((contactTypeKey) => <option key={contactTypeKey} value={contactTypeKey}>{CONTACT_TYPES_TRANSLATE[contactTypeKey]}</option>)}
                            </select>
                            <div className='AddressBook__card__contacts_group'>
                                {
                                    Object.keys(CONTACT_TYPES_CONTENT[contactItem.type]).map((formItem) => (
                                        <input
                                            key={`${index}-item-${formItem}`}
                                            type="text"
                                            value={contactItem[formItem]}
                                            name={formItem}
                                            placeholder={CONTACT_TYPES_TRANSLATE[formItem]}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const target = e.target.name
                                                actions.changeContactItemContent(value, target, index)
                                            }}
                                            className='input'
                                        />
                                    ))
                                }
                            </div>
                            <span
                                className='link delete'
                                onClick={(e) => { 
                                    e.preventDefault();
                                    actions.deleteContactItem(index) 
                                }}
                            >
                                Delete
                            </span>
                        </div>
                    )}
                </ul>
                <div className='AddressBook__card__add'>
                    <span
                        className='link'
                        onClick={(e) => {
                            e.preventDefault()
                            actions.addContactItem()
                        }}
                    >
                        Add new contact item
                    </span>
                </div>
                <div className='AddressBook__card__buttons--save'>
                    <button type='button' className='cancel' onClick={() => this.cancelEditing()}>Cancel</button>
                    <button
                        type='button'
                        onClick={() => {
                            contactData.id === NEWID ? this.saveNewContact(contactData) : this.saveExistingContact(contactData)
                        }}
                        disabled={contactData.name === '' || contactData.surname === '' || isAnyContactEmpty(contactData.contacts)}
                    >
                        Save
                    </button>
                </div>
            </div>
        )
    }
    showCard = (contactData) => {
        const {actions, data} = this.props
    
        return (
            <div className='AddressBook__card__content'>
                <div className='AddressBook__card__buttons'>
                    <span
                        className='link AddressBook__card__edit'
                        onClick={(e)=> {
                            e.preventDefault()
                            backupData = data
                            this.setState({editMode: true})
                        }}
                    >
                        Edit
                    </span>
                    <span
                        className='link AddressBook__card__close'
                        onClick={(e) => {
                            e.preventDefault()
                            actions.closeContact() 
                        }}>
                        Close
                    </span>
                </div>
                <h2>{contactData.name} {contactData.surname}</h2>
                <ul className='AddressBook__card__contacts'>
                    {contactData.contacts.map((contactItem, index) => 
                        <li key={`contactItem${index}`} className='contactItem'>
                            <div className='contactItemType'>{CONTACT_TYPES_TRANSLATE[contactItem.type]}</div>
                            <div className='contactItemContent'>
                                {Object.keys(CONTACT_TYPES_CONTENT[contactItem.type]).map((formItem) => 
                                    <ContactItem key={`${formItem}-${index}`} value={contactItem[formItem]} type={contactItem.type} innerType={formItem} />
                                )}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
    contactDetail = () => {
        const {editMode} = this.state
        const data = this.findContactDataById()
        return (
            <div className='AddressBook__card'>
                {editMode ? this.editCard(data) : this.showCard(data)}
            </div>
        )
    }
    deleteContact = (id) => {
        const {actions} = this.props
        try {
            fetch(`${API}/delete.php?id=${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
        }
        catch (err) {
            console.error('request failed', err);
        }
        actions.deleteContact(id)
    }
    contactsList = () => {
        const {data, actions} = this.props
        return (
            <div className='AddressBook__list'>
                <h2>Address Book</h2>
                {
                    data.length > 0 ? 
                        <div className='AddressBook__list_content'>
                            {[...data].sort((a, b) => {
                                    const surname1 = a.surname.toUpperCase()
                                    const surname2 = b.surname.toUpperCase()

                                    if (surname1 > surname2) {
                                        return 1
                                    }
                                    if (surname1 < surname2) {
                                        return -1
                                    }
                                    return 0
                            }).map((item) => 
                                <div
                                    className='AddressBook__contact-item link'
                                    key={item.id}
                                >
                                    <span className='AddressBook__contact-item--name' onClick={() => actions.openContact(item.id)}>{item.name} {item.surname}</span>
                                    <span
                                        className='link delete'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            this.deleteContact(item.id)
                                        }}
                                    >
                                        Delete
                                    </span>
                                </div>
                            )}
                        </div> : 
                        <div className='AddressBook__empty'>Your address book is empty.</div>
                }
                <span
                    className='link addNew'
                    onClick={(e) => {
                        e.preventDefault()
                        backupData = data
                        this.setState({editMode: true}, () => {
                            actions.addContact()
                        })
                    }}
                >
                    Add new contact
                </span>
            </div>
        )
    }
    loading = () => {
        return (
            <div className="loading"></div>
        )
    }

    render() {
        const {activeContactId} = this.props
        const {isLoading} = this.state

        return (
            <div className='AddressBook__content'>
                {isLoading ? this.loading() : activeContactId ? this.contactDetail() : this.contactsList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    activeContactId: state.activeContact
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)
  
export default connector(AddressBook)
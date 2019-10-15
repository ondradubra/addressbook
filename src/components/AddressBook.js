import React, {Component} from 'react'
import * as fetch from 'isomorphic-fetch'

import {CONTACT_TYPES, API} from '../constants/variables'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/actions'

class AddressBook extends Component {
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
        }).then((data) => actions.loadData(data))  
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
                                    className='AddressBook__contact-item'
                                    key={item.id}
                                >
                                    <span className='AddressBook__contact-item--name' onClick={() => actions.openContact(item.id)}>{item.name} {item.surname}</span>
                                    <span
                                        className='link delete'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            actions.deleteContact(item.id)
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
                        actions.addContact()
                    }}
                >
                    Add new contact
                </span>
            </div>
        )
    }
    isAnyContactEmpty = (contactData) => {
        let isAnyContactEmpty = false
        contactData.forEach((contact) => {
            isAnyContactEmpty = contact.content === '' 
        });
        return isAnyContactEmpty
    }
    findContactDataById = () => {
        const {activeContact, data} = this.props
        return data.find((item) => item.id === activeContact)
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
                            value={contactData.name}
                            className='input'
                            onChange={(e) => {
                                const value = e.target.value
                                actions.editName(value, 'name')
                            }}
                        />
                    </label>
                </div>
                <div className='formRow'>
                    <label>
                        <span className='formRow__label'>Last name</span>
                        <input
                            type="text"
                            value={contactData.surname}
                            className='input'
                            onChange={(e) => {
                                const value = e.target.value
                                actions.editName(value, 'surname')
                            }}
                        />
                    </label>
                </div>
                <ul className='AddressBook__card__contacts'>
                    {contactData.contacts.map((contactItem, index) => 
                        <div className='formRow' key={`edit-contactItem${index}`}>
                            <select onChange={(e) => actions.changeContactItemType(e.target.value, index)} value={contactItem.type}>
                                {Object.keys(CONTACT_TYPES).map((contactTypeKey) => <option key={contactTypeKey} value={contactTypeKey}>{CONTACT_TYPES[contactTypeKey]}</option>)}
                            </select>
                            <input
                                type="text"
                                value={contactItem.content}
                                onChange={(e) => {
                                    const value = e.target.value
                                    actions.changeContactItemContent(value, index)
                                }}
                                className='input'
                            />
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
                    <button type='button' className='cancel' onClick={() => actions.cancelEditing()}>Cancel</button>
                    <button
                        type='button'
                        onClick={() => actions.saveEditing()}
                        disabled={contactData.name === '' || contactData.surname === '' || this.isAnyContactEmpty(contactData.contacts)}
                    >
                        Save
                    </button>
                </div>
            </div>
        )
    }
    showCard = () => {
        const {actions} = this.props
        const contactData = this.findContactDataById()

        return (
            <div className='AddressBook__card__content'>
                <div className='AddressBook__card__buttons'>
                    <span
                        className='link AddressBook__card__edit'
                        onClick={(e)=> {
                            e.preventDefault()
                            actions.editContact(contactData)
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
                            <span className='contactItemType'>{CONTACT_TYPES[contactItem.type]}</span>
                            <span className='contactItemContent'>{contactItem.content}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
    contactCard = () => {
        const {isEditingContact} = this.props

        return (
            <div className='AddressBook__card'>
                {isEditingContact ? this.editCard(this.findContactDataById(), true) : this.showCard()}
            </div>
        )
    }
    render() {
        const {activeContact} = this.props
        console.log(this.props)
        return (
            <div className='AddressBook__content'>
                {activeContact ? this.contactCard() : this.contactsList()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    isEditingContact: state.isEditingContact,
    activeContact: state.activeContact
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
)
  
export default connector(AddressBook)
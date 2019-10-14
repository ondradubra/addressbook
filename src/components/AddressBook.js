import React, {Component} from 'react'
import {CONTACT_TYPES} from '../constants/variables'

export default class AddressBook extends Component {
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
                                    <a
                                        href='#'
                                        className='delete'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            actions.deleteContact(item.id)
                                        }}
                                    >
                                        Delete
                                    </a>
                                </div>
                            )}
                        </div> : 
                        <div className='AddressBook__empty'>Your address book is empty.</div>
                }
                <a
                    href=''
                    onClick={(e) => {
                        e.preventDefault()
                        actions.addContact()
                    }}
                >
                    Add new contact
                </a>
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
    editCard = (contactData, isEdit) => {
        const {actions} = this.props

        return (
            <div className='AddressBook__card__content'>
                <h2>Edit contact</h2>
                <div>
                    <input
                        type="text"
                        value={contactData.name}
                        className='input'
                        onChange={(e) => {
                            const value = e.target.value
                            actions.editName(value, 'name')
                        }}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={contactData.surname}
                        className='input'
                        onChange={(e) => {
                            const value = e.target.value
                            actions.editName(value, 'surname')
                        }}
                    />
                </div>
                <ul className='AddressBook__card__contacts'>
                    {contactData.contacts.map((contactItem, index) => 
                        <div key={`edit-contactItem${index}`}>
                            <select onChange={(e) => actions.changeContactItemType(e.target.value, index)} value={contactItem.type}>
                                {CONTACT_TYPES.map((contactType) => <option key={contactType} value={contactType}>{contactType}</option>)}
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
                            <a href='javascript:' className='delete' onClick={() => actions.deleteContactItem(index)}>Delete</a>
                        </div>
                    )}
                </ul>
                <div><a href='javascript:' onClick={() => actions.addContactItem()}>Add new contact item</a></div>
                <div>
                    <button type='button' onClick={() => actions.cancelEditing(isEdit)}>Cancel</button>
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
                <a href='javascript:' className='AddressBook__card__close' onClick={() => actions.closeContact()}>Close</a>
                <a href='javascript:' className='AddressBook__card__edit' onClick={()=> actions.editContact(contactData)}>Edit</a>
                <h2>{contactData.name} {contactData.surname}</h2>
                <ul className='AddressBook__card__contacts'>
                    {contactData.contacts.map((contactItem, index) => 
                        <li key={`contactItem${index}`}>{contactItem.type}: {contactItem.content}</li>
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
        const {activeContact, data, actions} = this.props
        console.log(this.props)
        return (
            <div className='AddressBook__card'>
                {activeContact ? this.contactCard() : this.contactsList()}
            </div>
        )
    }
}
export const CONTACT_TYPES = [
    'email', 
    'phone',
    'address',
]
export const CONTACT_TYPES_TRANSLATE = {
    email: 'E-mail', 
    phone: 'Phone',
    address: 'Address',
    street: 'Street',
    city: 'City',
    region: 'Region',
    zipcode: 'ZIP code'
}
export const CONTACT_TYPES_CONTENT = {
    email: {content: ''},
    phone: {content: ''},
    address: {street: '', city: '', region: '', zipcode: ''},
}
export const NEWID = 'NEW'
export const API = "http://localhost:8888"

export const isAnyContactEmpty = (contacts) => {
    let isEmpty = false
    contacts.forEach((item) => {
        Object.keys(item).forEach((property) => {
            if (item[property] === '') isEmpty = true
        })
    })
    return isEmpty
}
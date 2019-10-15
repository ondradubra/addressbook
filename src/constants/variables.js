export const CONTACT_TYPES = {
    email: 'E-mail', 
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    region: 'Region',
    zipcode: 'ZIP code'
}
export const NEWID = 'NEW'
export const API = "http://localhost:8888"

export const isAnyContactEmpty = (contacts) => {
    let isEmpty = false
    contacts && contacts.forEach((item) => {
        isEmpty = (item.content === '')
    })
    return isEmpty
}
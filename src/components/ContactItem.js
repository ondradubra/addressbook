import React from 'react'
import {CONTACT_TYPES_TRANSLATE} from '../constants/variables'

export const ContactItem = (props) => {
    const {value, type, innerType} = props
    if (type === 'email') {
        return <a href={`mailto:${value}`} className='link'>{value}</a>
    } else {
        if (innerType === 'content') {
            return <div className='simpleRow'>{value}</div>
        } else {
            return <div className='notSoSimpleRow'><span>{CONTACT_TYPES_TRANSLATE[innerType]}</span><div>{value}</div></div>
        }
    }
}
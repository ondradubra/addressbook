import {connect} from 'react-redux'
import AddressBook from '../components/AddressBook'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/actions'


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
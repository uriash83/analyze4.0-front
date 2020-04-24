import React from 'react'
import { factorDelete } from '../../store/actions/factorsActions';
import { connect } from 'react-redux';
import { Button, Modal} from 'semantic-ui-react';

class DeleteFactor extends React.Component {

    handleActionAndClose = () => {
        this.props.factorDelete(this.props.id,this.props.token)
        this.props.onClose()
    }
    render() {


        return (
            <Modal size='mini' open={this.props.openDelete} >
                <Modal.Header>Are you sure to delete?</Modal.Header>
                <Modal.Content>
                    <p><b>rTSS: </b>{this.props.tss}</p>
                    <p><b>Date: </b>{this.props.date}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button 
                        negative
                        content='No'
                        icon='delete'
                        onClick={this.props.onClose}
                    />
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content='Yes'
                        onClick={()=>this.handleActionAndClose()}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps,{factorDelete})(DeleteFactor)






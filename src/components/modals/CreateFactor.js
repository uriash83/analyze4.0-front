import React from 'react';
import { factorCreate } from '../../store/actions/factorsActions';
import { handleErrorForm } from '../../utility/handleErrorForm';
import { connect } from 'react-redux';
import { Button, Form, Modal, Grid, Message} from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


class CreateFactor extends React.Component {


    state = {
        date: new Date(),
        tss: 0,
        ctl: null,
        atl:null,
        tbs: null,
        user: null,
        open: 0,
        disabled:false,
        errors: {
            tss: null,
        }
    }
     
    handleChange = (event, { name, value }) => {
        this.setState({ [name]: value });
        this.setState({ user: this.props.userId})
        //onst { name, value } = e.target;
        let errors = this.state.errors;
        
        handleErrorForm(name,value,errors,null,null)
        this.setState({errors, [name]: value}, ()=> {
            console.log('ERR',errors)
            console.log('STATE',
                        'tss; ',this.state.errors.tss)
        })
        console.log(this.state)
        console.log('ERR',errors)
        if(this.state.errors.tss){
            this.setState({disabled: true})
        }else{
            this.setState({disabled: false})
        }
    }
    handleChangeDate = date => {
        this.setState({
            date: date
        });
    };
    handleSubmit = async (event) => {
        event.preventDefault();

        console.log(this.state)
        
        this.props.factorCreate(this.state,this.props.token)
        //this.props.onAuth(this.state.userName,this.state.password)
        //this.props.history.push('/');
        this.props.onClose()

    }
    render() {


        return (
            <Modal
                style={{ margin: "20px" }}
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Modal.Content>
                    <Grid centered columns={3}>
                        <Grid.Column>

                            <Form error  onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <Form.Input
                                        required
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="rTSS"
                                        className="auth-input-field"
                                        label="rTSS"
                                        name="tss"
                                        type="text"
                                        value={this.state.tss}
                                        onChange={this.handleChange}
                                        autoComplete="off"
                                    >
                                    </Form.Input>
                                    { this.state.errors.tss  ?                        
                                        <Message 
                                            style={{ width: "170px" }}
                                            error
                                            content='rTSS must be number 0-999'
                                        ></Message>  :
                                        <div></div>
                                    }
                                    
                                   
                                    <Form.Input >

                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={this.handleChangeDate}
                                            autoComplete="off"
                                        />
                                    </Form.Input>
                                </Form.Field>
                                <Button.Group vertical>
                                    <Form.Field>
                                        <Button
                                            disabled={this.state.disabled}
                                            type='submit'
                                            color="blue"
                                            style={{ width: "200px" }}
                                            size="medium"
                                        >
                                            ADD
                                        </Button>
                                    </Form.Field>
                                    <Form.Field>                                    
                                        <Button
                                            onClick={this.props.onClose}
                                            style={{ width: "200px" , marginTop: '10px'}}
                                            size="small"
                                        >
                                            Cancel
                                        </Button>                                        
                                    </Form.Field>
                                </Button.Group>
                            </Form>

                        </Grid.Column>
                    </Grid>
                </Modal.Content>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps,{factorCreate})(CreateFactor);



{/* <Form onSubmit={this.handleSubmit}>
                                <Form.Field>
                                    <Form.Input
                                        required
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="rTSS"
                                        className="auth-input-field"
                                        label="rTSS"
                                        name="tss"
                                        type="text"
                                        value={this.state.tss}
                                        onChange={this.handleChange}
                                    >
                                    </Form.Input>
                                    <Form.Input
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="CTL"
                                        className="auth-input-field"
                                        label="CTL"
                                        name="ctl"
                                        type="text"
                                    >
                                    </Form.Input>
                                    <Form.Input
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="ATL"
                                        className="auth-input-field"
                                        label="ATL"
                                        name="atl"
                                        type="text"
                                    >
                                    </Form.Input>
                                    <Form.Input
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="TBS"
                                        className="auth-input-field"
                                        label="TBS"
                                        name="tbs"
                                        type="text"
                                    >
                                    </Form.Input>
                                    <Form.Input style={{ width: "300px" }}>

                                        <DatePicker

                                            selected={this.state.date}
                                            onChange={this.handleChangeDate}
                                            autoComplete="off"
                                        />
                                    </Form.Input>
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        type='submit'
                                        color="blue"
                                        style={{ width: "300px" }}
                                        fluid size="medium">
                                        ADD
                                                </Button>
                                </Form.Field>
                            </Form> */}
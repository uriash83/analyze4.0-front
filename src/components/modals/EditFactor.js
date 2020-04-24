import React from 'react';
import { factorEdit } from '../../store/actions/factorsActions';
import { connect } from 'react-redux';
import { Button, Form, Modal, Grid,Message } from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


class EditFactor extends React.Component {
    
    
    render() {

        return (
            <Modal
                style={{ margin: "20px" }}
                open={this.props.openEdit}
                onClose={this.props.onClose}
            >
                <Modal.Content>
                    <Grid centered columns={3}>
                        <Grid.Column>

                            <Form error onSubmit={this.props.handleSubmit}>
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
                                        value={this.props.tss}
                                        onChange={this.props.handleChange}
                                        autoComplete="off"
                                    >
                                    </Form.Input>
                                    { this.props.errors.tss  ?                        
                                        <Message 
                                            style={{ width: "170px" }}
                                            error
                                            content='rTSS must be number 0-999'
                                        ></Message>  :
                                        <div></div>
                                    }
                                    <Form.Input
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="ATL"
                                        className="auth-input-field"
                                        label="ATL"
                                        name="atl"
                                        type="text"
                                        value={this.props.atl}
                                        onChange={this.props.handleChange}
                                        autoComplete="off"
                                    >
                                    </Form.Input>
                                    { this.props.errors.atl  ?                        
                                        <Message 
                                            style={{ width: "170px" }}
                                            error
                                            content='ATL must be number 0-999'
                                        ></Message>  :
                                        <div></div>
                                    }
                                    <Form.Input
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="CTL"
                                        className="auth-input-field"
                                        label="CTL"
                                        name="ctl"
                                        type="text"
                                        value={this.props.ctl}
                                        onChange={this.props.handleChange}
                                        autoComplete="off"
                                    >
                                    </Form.Input>
                                    { this.props.errors.ctl  ?                        
                                        <Message 
                                            style={{ width: "170px" }}
                                            error
                                            content='CTL must be number 0-999'
                                        ></Message>  :
                                        <div></div>
                                    }
                                    <Form.Input
                                        style={{ width: "170px" }}
                                        fluid
                                        placeholder="TBS"
                                        className="auth-input-field"
                                        label="TBS"
                                        name="tbs"
                                        type="text"
                                        value={this.props.tbs}
                                        onChange={this.props.handleChange}
                                        autoComplete="off"
                                    >
                                    </Form.Input>
                                    { this.props.errors.tbs  ?                        
                                        <Message 
                                            style={{ width: "170px" }}
                                            error
                                            content='TBS must be number 0-999'
                                        ></Message>  :
                                        <div></div>
                                    }
                                    <Form.Input >

                                    <DatePicker
                                            
                                            selected={this.props.date}
                                            onChange={this.props.handleChangeDate}
                                            autoComplete="off"
                                        />
                                    </Form.Input>
                                </Form.Field>
                                <Button.Group vertical>
                                    <Form.Field>
                                        <Button
                                            type='submit'
                                            color="blue"
                                            style={{ width: "200px" }}
                                            size="medium"
                                            disabled={this.props.disabled}
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


export default connect(null,{factorEdit})(EditFactor);

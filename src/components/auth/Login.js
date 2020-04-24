import React, { Component } from 'react'
import { Form, Button, Message, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

class Login extends Component {

  state = {
    userName: null,
    password: null
  };

  handleChange = (e, ) => {

    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = async (event) => {
    event.preventDefault();
   
    console.log('value', this.state.userName, this.state.password)
    this.props.onAuth(this.state.userName,this.state.password)
    this.props.history.push('/');

  }


  render() {
    
    return (
        <Grid centered columns={3} style={{margin: '20px'}}>
        
            <Grid.Column >

            {
              this.props.loading ?
              <div>
                LOADING
              </div>

              :
              
                      <Form onSubmit={this.handleSubmit} >
                        <Form.Field>
                          <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Login"
                            className="auth-input-field"
                            label="login"
                            name="userName"
                            type="text"
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            label="password"
                            name="password"
                            type="password"
                            className="auth-input-field"
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Button type='submit' color="teal" fluid size="huge">
                            Login
                          </Button>
                        </Form.Field>
                        <Form.Field>
                          <Message size="big">
                            <Link to="/signup">Not Registered?</Link>
                          </Message>
                        </Form.Field>
                      </Form>
                    
            }
            </Grid.Column>
        
        </Grid>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
     
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
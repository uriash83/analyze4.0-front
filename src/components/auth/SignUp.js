import React, { Component } from 'react'
import { Form, Button, Message, Grid , Icon} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { handleErrorForm } from '../../utility/handleErrorForm';
import * as actions from '../../store/actions/auth';

class SignUp extends Component {

  state = {
    userName: null,
    email: null,
    password1: null,
    password2: null,
    disabled: false,
    errors: {
      userName: null,
      email: null,
      password1: null,
      password2: null
    }
  };
  
  

  handleChange = (e ) => {

    this.setState({ [e.target.name]: e.target.value })
    const { name, value } = e.target;
    let errors = this.state.errors;

    handleErrorForm(name,value,errors,this.state.password1,this.state.password2)
    
    

    this.setState({errors, [name]: value}, ()=> {
      console.log('ERR',errors)
      console.log('STATE',
                  'userName; ',this.state.userName,
                  'email: ',this.state.email , 
                  'password1: ',this.state.password1, 
                  'password2',this.state.password2)
    })

    // if there is error in typo and input value null , disable button
    if(this.state.errors.userName || this.state.errors.email || this.state.errors.password1 || this.state.errors.password2 || 
      this.state.userName || this.state.email || this.state.password1 || this.state.password2 ){
      this.setState({disabled: true})
    }else{
      this.setState({disabled: false})
  }
  }
  handleSubmit = (event) => {
    event.preventDefault();
   
    console.log('valueSignup', this.state.userName, this.state.email , this.state.password1, this.state.password2)
    this.props.onAuth(this.state.userName,this.state.email , this.state.password1, this.state.password2)
    this.props.history.push('/');

}

  render() {
    
    let errorMessage = null;
    if (this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        );
    }
    return (
      <Grid columns={1} centered={1}>
        <Grid.Row>
          <Grid.Column style={{width:'350px'}}>

            {errorMessage}
          {
            this.props.loading ?

            <Icon.Group size='huge'>
              <Icon loading size='big' name='circle notch' />
              <Icon name='user' />
            </Icon.Group>

            :
            
                    <Form  error onSubmit={this.handleSubmit} style={{width:'300px'}}>
                      <Form.Field>
                        <Form.Input
                          fluid
                          icon="envelope"
                          iconPosition="left"
                          placeholder="Email"
                          className="auth-input-field"
                          label="Email"
                          name="email"
                          type="text"
                          onChange={this.handleChange}
                          
                         
                        />
                      </Form.Field>
                      { this.state.errors.email  ?                        
                        <Message 
                          error
                          content='Email is not valid!'
                        ></Message>  :
                        <div></div>
                      }
                      <Form.Field>
                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="Login"
                          className="auth-input-field"
                          label="Login"
                          name="userName"
                          type="text"
                          onChange={this.handleChange}
                          //error={{ content: this.state.errors.userName, pointing: 'below' }}
                        />
                      </Form.Field>
                      { this.state.errors.userName  ?                        
                        <Message 
                          error
                          content='Username must be 5 characters long'
                        ></Message>  :
                        <div></div>
                      }
                      <Form.Field>
                        <Form.Input
                          fluid
                          icon="lock"
                          iconPosition="left"
                          placeholder="Password"
                          label="Password"
                          name="password1"
                          type="password"
                          className="auth-input-field"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      { this.state.errors.password1  ?                        
                        <Message 
                          error
                          content={this.state.errors.password1}
                        ></Message>  :
                        <div></div>
                      }
                      <Form.Field>
                        <Form.Input
                          fluid
                          icon="lock"
                          iconPosition="left"
                          placeholder="Password confirm"
                          label="Password confirm"
                          name="password2"
                          type="password"
                          className="auth-input-field"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      { this.state.errors.password2  ?                        
                        <Message 
                          error
                          content={this.state.errors.password2}
                        ></Message>  :
                        <div></div>
                      }
                      <Form.Field>
                        <Button 
                          type='submit' 
                          color="teal" 
                          fluid size="huge"
                          disabled={this.state.disabled}
                        >
                          Register
                        </Button>
                      </Form.Field>
                    </Form>
                  
          }
          </Grid.Column>
        </Grid.Row>
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
      onAuth: (username,email, password1 , password2) => dispatch(actions.authSignup(username, email, password1 , password2)) 
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);
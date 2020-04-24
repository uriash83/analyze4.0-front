import React from 'react'
import { withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import * as actionsFactor from '../store/actions/factorsActions'

class Header extends React.Component {
    state = {
        activeItem: null
    }
    handleOnClockLogout = () => {
        this.props.history.push('/')
        this.props.factorReset()
        this.props.logout()
    }
    handleItemClick = (event) => {
        //console.log(event)
        this.setState({ activeItem: event.target.name })
        //console.log(this.state.activeItem)
    }
    render() {
        
        const { activeItem } = this.state
        return (
            <Container>
                <Menu 
                    inverted
                    
                    >

                    <Menu.Item
                        name="Analyze4.0"
                        position="center"
                        active={activeItem === 'Analyze4.0'}
                        onClick={this.handleItemClick}

                    >
                        <Link to='/home'>
                            Analyze4.0
                        </Link>
                    </Menu.Item>
                    {
                        this.props.isAuthenticated 

                        ?
                        <Menu inverted>
                            <Menu.Item
                            name="Dashboard"
                            active={activeItem === 'Dashboard'}
                            onClick={this.handleItemClick}

                            >
                                <Link to='/dashboard' >
                                    Dashboard
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                            name="PEC"
                            active={activeItem === 'PEC'}
                            onClick={this.handleItemClick}

                            >
                                <Link to='/pec' >
                                    PMC
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                            name="Settings"
                            active={activeItem === 'Settings'}
                            onClick={this.handleItemClick}

                            >
                                <Link to='/settings' >
                                    Settings
                                </Link>
                            </Menu.Item>
                        </Menu>

                        :

                        <div>

                        </div>

                    }
                    
                    <Menu.Menu
                        position="right"
                    >
                    {
                        this.props.isAuthenticated 
                        
                        ?
                        <Menu inverted>
                            <Menu.Item>
                                {this.props.userName}
                            </Menu.Item>
                            <Menu.Item>
                                <Link class="ui button" onClick={this.handleOnClockLogout}>Sign out</Link>
                            </Menu.Item>
                        </Menu>
                        :

                        <Menu.Item>
                            <Link to='/login' class="ui primary button">Sign in</Link>
                        </Menu.Item>

                    }




                    </Menu.Menu>
                </Menu>

            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
      isAuthenticated: state.auth.token !== null,
      userName: state.auth.userName
    }
  }
const mapDispatchToProps = dispatch => {
    return {
        logout: () => { dispatch(actions.logout()) },
        factorReset: () => { dispatch(actionsFactor.factorReset())}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
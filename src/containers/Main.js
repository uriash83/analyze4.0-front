import React from 'react';
import { Container, Message , Segment , Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Main extends React.Component {

    render() {
        // let errorMessage = null;
        // if (this.props.error) {
        //     errorMessage = (
        //         <p>{this.props.error.message}</p>
        //     );
        // }
        return (
            <Container text style={{ margin: '20px' }}>
                {
                    this.props.errorMessage || this.props.errorError

                        ?

                        <Message negative style={{ marginTop: '20px' }}>
                            <p style={{ textAlign: 'center' }}>{this.props.errorMessage}</p>
                            <p style={{ textAlign: 'center' }}>{this.props.errorError}</p>
                        </Message>

                        : <div>
                            

                            <Segment placeholder disabled>
                                <Header icon>
                                <Icon name='chart bar' />
                                    <p>Make your run more effective!</p>
                                    <p>Please SIGN UP and SIGN IN to get more info</p>                                  

                                </Header>
                                
                            </Segment>



                    </div>
                }

                
                
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
      errorMessage: state.auth.error.message || null,
      errorError: state.auth.error.error || null,
      loading: state.auth.loading
    }
  }

export default connect(mapStateToProps,null)(Main);
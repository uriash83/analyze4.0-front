import React from 'react';
import { Link } from 'react-router-dom';
import {factorsGet, factorDelete } from '../store/actions/factorsActions';
import { connect } from 'react-redux';
import { Container, Button, Segment, Grid, } from 'semantic-ui-react';
import CreateFactor from "./modals/CreateFactor";
import "react-datepicker/dist/react-datepicker.css";

class Settings extends React.Component {

    
    closeCreateModal = () => this.setState({ open: false })

    showCreateModal = () => {
        this.setState({ 
            open: true
        })
    }
    
    render() {
        return (
            <Container style={{ margin: "20px" }}>
                <Grid centered columns={2}>
                    <Grid.Column inverted>
                        <Segment disabled textAlign='center'>
                            <br/><br/><br/><br/>
                            <br/><br/><br/><br/>
                            <p><h1>   IN</h1></p>
                            <p><h1>PROGRESS</h1></p>
                            <br/><br/><br/><br/>
                            <br/><br/><br/><br/>
                            <br/>
                        </Segment> 
                    </Grid.Column>
                    <Grid.Column inverted>
                        <Segment vertical>
                            <Grid centered columns={3}>
                                <Grid.Column>
                                    <br/><br/><br/><br/>
                                    <br/><br/><br/><br/>
                                    <Button  onClick={()=> this.showCreateModal()} color="blue">Add new rTSS</Button>
                                    <CreateFactor
                                        onClose={this.closeCreateModal}
                                        {...this.state}
                                        
                                    />
                                    <br/><br/><br/><br/>
                                    <Link to='/rawdata'>
                                        <Button
                                            color="grey"
                                            size="medium">
                                            Raw Data
                                        </Button>
                                    </Link>
                                    <br/><br/><br/><br/>
                                    <br/><br/><br/><br/>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userName: state.auth.token,
        factors: Object.values(state.factors)
    }
}
export default connect(mapStateToProps, { factorsGet, factorDelete })(Settings);
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { factorEdit, factorsGet } from '../store/actions/factorsActions';
import { Container, Table, Button, Segment, Icon, Loader, Pagination, Menu } from 'semantic-ui-react';
import DeleteFactor from './modals/DeleteFactor';
import EditFactor from './modals/EditFactor';
import { handleErrorForm } from '../utility/handleErrorForm';
class RawData extends React.Component {

    state = {

        tss: 0,
        ctl: 0,
        atl: 0,
        tbs: 0,
        date: new Date(),
        openEdit: 0,
        openDelete: 0,
        activePage: '',
        id: 0,
        diabled: false,
        errors: {
            tss: null,
            ctl: null,
            atl: null,
            tbs: null
        }
    }
    static getDerivedStateFromProps(props, state) {
        console.log('GDSP')
        console.log(props,state)
        // if (props.activePage !== state.activePage) {
             return {
                 activePage:  state.activePage,
              
             };
        // }
        
    }
    
    componentDidMount(){
        console.log('CDM')
        this.getDataFromSever() // to się wywoła gdy ktos wejdzie pierwszy raz
    }
        
    onPageChange = (event, data) => {
        console.log(data.activePage)
        this.setState({activePage: data.activePage})
        console.log(this.state.activePage)
        this.getDataFromSever(data.activePage) // to sie wywoła ktos zmieni zstone , a potem zapisuje activePage w state w getDerivedStateFromProps
    }

    getDataFromSever = (activePage) =>{
        var paramsToUrl = '';
        if(activePage !== 0 && activePage !== false && activePage !== ' ' && activePage !== '' && activePage !== undefined){
            paramsToUrl = `?page=${activePage}`
            console.log('D',activePage,'D')
            console.log(paramsToUrl)
        }
        
        this.props.factorsGet(localStorage.getItem('token'),paramsToUrl)
    }

    /// EDIT  ///
    // nie można dać hanle i state do EditFactor bo nie da się przekazać propsów do state w Modal
    handleEditChange = (event, { name, value }) => {
        this.setState({ [name]: value });
        console.log(name, this.state)
        let errors = this.state.errors;
        handleErrorForm(name, value, errors, null, null)
        this.setState({ errors, [name]: value }, () => {
            console.log('ERR', errors)

        })
        console.log(this.state)
        console.log('ERR', errors)
        if (this.state.errors.tss || this.state.errors.ctl || this.state.errors.atl || this.state.errors.tbs) {
            this.setState({ disabled: true })
        } else {
            this.setState({ disabled: false })
        }

    }
    handleEditChangeDate = date => {
        this.setState({
            date: date
        });
    };
    handleEditSubmit = async (event) => {
        event.preventDefault();

        console.log('STATE', this.state)
        this.props.factorEdit(this.state.id, this.state, this.props.token)
        this.closeModal()

    }

    showEditModal = ({ id, date, tss, atl, ctl, tbs }) => {
        this.setState({
            openEdit: true,
            id: id,
            date: new Date(date), // wrong data fromat so must be new Date()
            tss: tss,
            atl: atl,
            ctl: ctl,
            tbs: tbs

        })
    }

    /// DELETE ///
    showDeleteModal = ({ id, date, tss }) => {
        this.setState({
            openDelete: true,
            id: id,
            date: date,
            tss: tss

        })
    }

    /// BOTH ///
    closeModal = () => {
        this.setState({
            openEdit: false,
            openDelete: false
        })
    }

    rendermap() {
        return this.props.factors.map(factor => {
            return (

                <Table.Row>
                    <Table.Cell>{factor.id}</Table.Cell>
                    <Table.Cell>{factor.date}</Table.Cell>
                    <Table.Cell>{factor.tss}</Table.Cell>
                    <Table.Cell>{factor.atl}</Table.Cell>
                    <Table.Cell>{factor.ctl}</Table.Cell>
                    <Table.Cell>{factor.tbs}</Table.Cell>
                    <Table.Cell>
                        <div>

                            <Button onClick={() => this.showEditModal(factor)} inverted size='mini' color='blue'>
                                <Icon inverted color='blue' name='edit' />
                            </Button>


                            <Button onClick={() => this.showDeleteModal(factor)} inverted size='mini' color='red'>
                                <Icon inverted color='red' name='delete' />
                            </Button>


                        </div>

                    </Table.Cell>
                </Table.Row>
            )
        }


        );
    }
    dataReadyToRender() {
        if (this.props.factors === undefined || this.props.factors.length === 0) {
            return false
        }
        return true
    }
    render() {
        return (
            <Container style={{ margin: "20px" }}>
                {

                    !this.dataReadyToRender()

                        ?

                        <Segment inverted size='large'>
                            <Loader inline='centered' active content='Loading' />

                        </Segment>
                        :


                        <Table celled inverted selectable size='small' color='black'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Id</Table.HeaderCell>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.HeaderCell>rTSS</Table.HeaderCell>
                                    <Table.HeaderCell>ATL</Table.HeaderCell>
                                    <Table.HeaderCell>CTL</Table.HeaderCell>
                                    <Table.HeaderCell>TBS</Table.HeaderCell>
                                    <Table.HeaderCell>ACT</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.rendermap()}
                                
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.Cell colSpan='6' textAlign='center'>
                                        <Pagination
                                            inverted
                                            defaultActivePage={1}
                                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                                            totalPages={this.props.numPages}
                                            onPageChange={this.onPageChange}
                                        />

                                    </Table.Cell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>


                }

                <DeleteFactor
                onClose={this.closeModal}
                {...this.state}
                />
                <EditFactor
                onClose={this.closeModal}
                handleChange={this.handleEditChange}
                handleChangeDate={this.handleEditChangeDate}
                handleSubmit={this.handleEditSubmit}
                {...this.state}
                />
            </Container>


        );
    }
}
const mapStateToProps = (state) => {

    return {
        //factors: [],

        factors: state.factors.data,
        numPages: state.factors.num_pages,
        count: state.factors.count,
        token: state.auth.token
    }
}
export default connect(mapStateToProps, { factorEdit, factorsGet })(RawData);


{/* <Pagination
    inverted
    defaultActivePage={5}
    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
    prevItem={{ content: <Icon name='angle left' />, icon: true }}
    nextItem={{ content: <Icon name='angle right' />, icon: true }}
    totalPages={10}
/> */}
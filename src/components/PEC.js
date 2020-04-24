import React from 'react'
import { Container,Form , Grid , Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux';
import { factorsGet } from '../store/actions/factorsActions';
import Chart from './chart/Chart'
const options = [
    { key: '1',text: '1 month', value: '30' },
    { key: '2',text: '2 month', value: '60' },
    { key: '3',text: '3 month', value: '90' },
  ]



  
class PEC extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            PECrangeDisplay: '30'
        }
    }
    componentDidMount(){

    }
    componentDidMount(){
        console.log('cdm')
        var paramsToServer = ''
        this.getDataFromServer(this.state.PECrangeDisplay)
    }
    static getDerivedStateFromProps(props, state) {
        console.log('GDSP')
        console.log(props,state)
        // if (props.activePage !== state.activePage) {
             return {
                PECrangeDisplay:  state.PECrangeDisplay,
              
             };
        // }
        
    }
    getDataFromServer = (month) => {

        var paramsToServer = `?month=${month}`;

        this.props.factorsGet(localStorage.getItem('token'),paramsToServer)
    }
    
    handleChange = (event, {name,value}) => {
        console.log(name, value)
        this.setState({PECrangeDisplay: value})
        this.getDataFromServer(value)
        console.log(this.state)
    }
    ///BUTTON USUNAC !!!!
    handleApplyButton = (event, {name,value}) => {
        console.log(name, value)
        console.log(this.state)
        this.props.factorsGet(localStorage.getItem('token'),this.state.PECrangeDisplay)
    }
    dataReadyToRender(){
        if(this.props.factors === undefined || this.props.factors.length === 0){
            return false
        }
        return true
    }
    render() {
        return (
            this.dataReadyToRender() 

            ?

            <Container>
                
                <Chart 
                    data={this.props.factors}
                />
                    <Container>
                        <Grid centered columns={3}>
                            <Grid.Column>
                                <Form onSubmit={this.handleApplyButton} >
                                    <Form.Group>
                                        <Dropdown
                                            selection
                                            placeholder='Name'
                                            name='name'
                                            onChange={this.handleChange}
                                            options={options}
                                            //defaultValue='30'
                                            value={this.state.PECrangeDisplay}
                                        />
                                        
                                        <Form.Button 
                                            color='blue' 
                                            content='Apply' 
                                            type='submit'
                                            
                                        />
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                        </Grid>
                    </Container>
            </Container>

            :

            <div>
                Loading....
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        factors: state.factors.data
    }
}

export default connect(mapStateToProps,{factorsGet})(PEC);
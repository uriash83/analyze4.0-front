import axios from 'axios';
import * as actionTypes from './actionsTypes';


export const factorCreate = (data,token) => async dispatch => {
    //data.user = '1'//store.getState().auth.token;
    console.log('data', data , 'token',token)
    try{
        const response = await axios(
            {
                method: 'post',
                url: 'http://127.0.0.1:8000/api/factors/factors/',
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}` //6dd2bdd895fd526af3f17a6f520258fab7cd22ab  a459da4d9b3acd6010a6f7e2c5f96c55ff150926	
                    
                },
            }); 
        dispatch( {   // tu musi być dispach bo to jest funcka async wiec agodnie z regułemi thunk 
            type: actionTypes.FACTOR_CREATE,
            data: response.data
        });
    } catch(error){

        // nie ma sensu łapać error jak mam private route
        //console.log(error)
        //console.log(error.message)
        //console.log(error.response.data.detail)
        //console.log(error.response.statusText)

    }
}; 

export const factorsGet = (token,paramsToServer) => async dispatch => {
    const BASEURL = 'http://127.0.0.1:8000/api/factors/factors/'
    
    const response = await axios(
        {
            method: 'get',
            url: `http://127.0.0.1:8000/api/factors/factors/${paramsToServer}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` //6dd2bdd895fd526af3f17a6f520258fab7cd22ab  a459da4d9b3acd6010a6f7e2c5f96c55ff150926	
                
            }
        }
        ); 
    console.log(response.data)
    dispatch( {   // tu musi być dispach bo to jest funcka async wiec agodnie z regułemi thunk 
        type: actionTypes.FACTORS_GET,
        data: response.data
    });
}; 

export const factorDelete = (id,token) => async dispatch => {
    await axios(
        {
            method: 'delete',
            url: `http://127.0.0.1:8000/api/factors/factors/${id}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` //6dd2bdd895fd526af3f17a6f520258fab7cd22ab  a459da4d9b3acd6010a6f7e2c5f96c55ff150926	
                
            },

        }); 
    dispatch( {   // tu musi być dispach bo to jest funcka async wiec agodnie z regułemi thunk 
        type: actionTypes.FACTOR_DELETE,
        data: id
    });
   
}; 
export const factorEdit = (id,data,token) => async dispatch => {
    data.user = localStorage.getItem('userId')
    const response = await axios(
        {
            method: 'put',
            url: `http://127.0.0.1:8000/api/factors/factors/${id}/`,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}` //6dd2bdd895fd526af3f17a6f520258fab7cd22ab  a459da4d9b3acd6010a6f7e2c5f96c55ff150926	
                
            },
        }
    );
    dispatch( {   // tu musi być dispach bo to jest funcka async wiec agodnie z regułemi thunk 
        type: actionTypes.FACTOR_EDIT,
        data: response.data
    });
   
}; 

export const factorReset  = () => dispatch => {
    dispatch({
        type: actionTypes.FACTOR_RESET,
        data: {}
    })
}
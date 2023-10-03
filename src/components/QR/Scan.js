import {useState} from "react";
import {QrReader} from 'react-qr-reader'
import { Container } from '@mui/material'
import { BACK_URL } from '../../constants';
import { useNavigate, useLocation } from "react-router-dom";


const Scan = () =>{
    const AUTH = localStorage.getItem('token');
    const [data,setData] = useState('No result')
    const apiUrl = BACK_URL + '/api/v1/add_friend';
    const navigate = useNavigate();


    return(
        <Container 
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    sx={{ mx: 2, mt: '90px' }}
    >
    <QrReader onResult={(result,error)=>{
        if(!!result){
            setData(result?.text);
            const queryParams = new URLSearchParams(result.text)

         
            const user_id = queryParams.get('user_id')
            const friendshipToken = queryParams.get('friendship_token')

            const to_send = {'token':friendshipToken,'id':user_id}
            const jsonData = JSON.stringify(to_send)

            fetch(apiUrl,{
                headers: new Headers({Authorization: `Bearer ${AUTH}`,}),
            
            method:'POST',
            body:jsonData
               
            })
            .then((response)=>{ response.json()})
            .then((datos)=>{
                if(datos.error){
                    alert(datos.error)
                }
                else{
                    alert('Creada con exito!')
                    navigate('/')
                }
                
                // alert(datos)


            })
            .catch((error)=>{
                alert(error)
                console.error('Error, NO SE PUDO CREAR LA RELACION')
            })
            
        }

        if(!!error){
            // console.info(error);
        }
    }}
    style = {{width:'100%'}}
    />

    <p>{data}</p>



    </Container>
    )
}
export default Scan
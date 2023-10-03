import React, { useEffect, useState } from 'react';
import { BACK_URL } from '../../constants';
import { Container} from "@mui/material";



const GenerateQr = () => {
  const [qrImage, setQrImage] = useState(null);
  const AUTH = localStorage.getItem('token');
  const apiUrl = BACK_URL + '/api/v1/Qrcode';
  // Lógica para obtener el token de amistad del backend
  useEffect(() => {

    const headers = {
        Authorization: `Bearer ${AUTH}`,
      };
    // Realiza una solicitud HTTP al backend para obtener el token de amistad
    const fetchQRCodeData =  () =>{
     
      fetch(apiUrl, {
        headers, // Agrega los encabezados con el token de autorización
        
      })
      .then((response) => response.blob())
      .then((blob) => {
        const qrImageURL = URL.createObjectURL(blob);
        setQrImage(qrImageURL);
        // alert('cambiado')
      })
      .catch((error) => {
        alert(error)
        console.error('Error al obtener el código QR:', error);
      });
    }
    fetchQRCodeData();

    const intervalId = setInterval(()=>{
      fetchQRCodeData();
    },60000)

    return () => clearInterval(intervalId)

  }, [AUTH,apiUrl]);



  return (
    <Container 
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    sx={{ mx: 2, mt: '90px' }}
    >
      <h2>ADD ME</h2>
      {qrImage ? <img src={qrImage} alt="Código QR de amistad" /> : <p>Cargando código QR...</p>}
    </Container>
  );
};

export default GenerateQr;
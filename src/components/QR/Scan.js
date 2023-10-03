import { useState, useEffect } from "react";
import { QrReader } from 'react-qr-reader';
import { Container } from '@mui/material';
import { BACK_URL } from '../../constants';
import { useNavigate } from "react-router-dom";

const Scan = () => {
    const AUTH = localStorage.getItem('token');
    const [data, setData] = useState('No result');
    const apiUrl = BACK_URL + '/api/v1/add_friend';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const position = await getCurrentPositionAsync();
                const { latitude, longitude } = position.coords;

                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                // Make the fetch request with latitude and longitude
                const queryParams = new URLSearchParams(data);
                const user_id = queryParams.get('user_id');
                const friendshipToken = queryParams.get('friendship_token');

                const to_send = {
                    'token': friendshipToken,
                    'id': user_id,
                    'coords': { 'latitude': latitude, 'longitude': longitude }
                };
                const jsonData = JSON.stringify(to_send);

                const response = await fetch(apiUrl, {
                    headers: new Headers({ 'Authorization': `Bearer ${AUTH}` }),
                    method: 'POST',
                    body: jsonData
                });

                const datos = await response.json();

                if (datos.error) {
                    alert(datos.error);
                } else {
                    alert('Creada con éxito!');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error, NO SE PUDO CREAR LA RELACIÓN');
            }
        };

        const getCurrentPositionAsync = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(position);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        };

        fetchData();
    }, [data, apiUrl, AUTH, navigate]);

    return (
        <Container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ mx: 2, mt: '90px' }}
        >
            <QrReader onResult={(result, error) => {
                if (!!result) {
                    setData(result?.text);
                }

                if (!!error) {
                    // Handle error if needed
                }
            }}
                style={{ width: '100%' }}
            />

        </Container>
    );
}

export default Scan;

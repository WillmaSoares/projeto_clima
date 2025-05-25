import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';


const Inicio: React.FC = () => {
    return (
        <div>
        <Box
            sx={{
            minHeight: 'calc(100vh - 64px)',
            background: 'linear-gradient(to right, #2196f3, #21cbf3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: 4,
            }}
        >
            <Container maxWidth="sm">
            <Typography variant="h3" gutterBottom>
                Bem-vindo ao Clima 
            </Typography>
            <Typography variant="body1" gutterBottom>
                Este projeto foi desenvolvido para mostrar a previsão do tempo de forma simples e prática.
                Você pode buscar cidades, ver os dados atualizados e salvar suas favoritas.
            </Typography>

            <Box mt={4} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                <Button variant="contained" color="primary" onClick={() => window.location.href = '/clima'}>
                Ver Clima
                </Button>
                <Button variant="outlined" color="inherit" onClick={() => window.location.href = '/favoritos'}>
                Cidades Favoritas
                </Button>
            </Box>
            </Container>
        </Box>
        </div>
    );
};

export default Inicio;

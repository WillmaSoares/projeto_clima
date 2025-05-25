import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface CartaoClimaProps {
  dados: {
    localizacao: string;
    temperatura_c: number;
    condicao: {
      texto: string;
      icone: string;
    };
    umidade: number;
    vento_kph: number;
  };
}

const CartaoClima: React.FC<CartaoClimaProps> = ({ dados }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{dados.localizacao}</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <img src={dados.condicao.icone} alt={dados.condicao.texto} />
        <Typography>
          {dados.temperatura_c} °C - {dados.condicao.texto}
        </Typography>
      </Box>
      <Typography>Umidade: {dados.umidade}%</Typography>
      <Typography>Vento: {dados.vento_kph} km/h</Typography>
    </CardContent>
  </Card>
);

export default CartaoClima;

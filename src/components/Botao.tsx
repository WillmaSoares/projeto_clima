import React from 'react';
import Button from '@mui/material/Button';

interface BotaoProps {
  texto: string;
  aoClicar: () => void;
  desabilitado?: boolean;
}

const Botao: React.FC<BotaoProps> = ({ texto, aoClicar, desabilitado }) => (
  <Button variant="contained" onClick={aoClicar} disabled={desabilitado}>
    {texto}
  </Button>
);

export default Botao;

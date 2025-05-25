import React from 'react';
import TextField from '@mui/material/TextField';

interface InputTextoProps {
  label: string;
  valor: string;
  aoAlterar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  larguraTotal?: boolean;
}

const InputTexto: React.FC<InputTextoProps> = ({ label, valor, aoAlterar, larguraTotal }) => (
  <TextField
    label={label}
    value={valor}
    onChange={aoAlterar}
    fullWidth={larguraTotal}
  />
);

export default InputTexto;

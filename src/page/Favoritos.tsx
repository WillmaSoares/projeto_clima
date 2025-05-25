import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Favoritos: React.FC = () => {
  const [favoritos, setFavoritos] = useState<string[]>([])

  useEffect(() => {
    const favoritosStorage = localStorage.getItem('favoritos')
    if (favoritosStorage) {
      setFavoritos(JSON.parse(favoritosStorage))
    }
  }, [])

  const removerFavorito = (cidade: string) => {
    const novaLista = favoritos.filter((c) => c !== cidade)
    setFavoritos(novaLista)
    localStorage.setItem('favoritos', JSON.stringify(novaLista))
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
        Cidades Favoritas
      </Typography>
      {favoritos.length === 0 && (
        <Typography variant="body1">Nenhuma cidade favoritada ainda.</Typography>
      )}
      <List>
        {favoritos.map((cidade) => (
          <ListItem
            key={cidade}
            secondaryAction={
              <IconButton edge="end" aria-label="deletar" onClick={() => removerFavorito(cidade)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={cidade} />
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Favoritos

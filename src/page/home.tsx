import React, { useState } from 'react'
import type { ClimaCompleto } from '../interfaces/ClimaCompleto'
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
} from '@mui/material'
import InputTexto from '../components/InputTexto'
import Botao from '../components/Botao'
import CartaoClima from '../components/CartaoClima'
import { fetchWeatherData } from '../apiClima'

const Home: React.FC = () => {
  const [cidade, setCidade] = useState('')
  const [clima, setClima] = useState<ClimaCompleto | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const buscarClima = async () => {
    if (!cidade.trim()) {
      setErro('Por favor, insira uma cidade.')
      setClima(null)
      return
    }
    setCarregando(true)
    setErro('')
    setClima(null)
    try {
      const dados = await fetchWeatherData(cidade)
      setClima(dados)
    } catch {
      setErro('Erro ao buscar o clima. Tente outra cidade.')
    } finally {
      setCarregando(false)
    }
  }
const favoritarCidade = () => {
  if (!clima) return;

  const nomeFavorito = clima.location.name;

  // Pega favoritos do localStorage 
  const favoritos: string[] = JSON.parse(localStorage.getItem('favoritos') || '[]');

  // Verifica se já está na lista
  if (!favoritos.includes(nomeFavorito)) {
    favoritos.push(nomeFavorito);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert(`${nomeFavorito} adicionado(a) aos favoritos!`);
  } else {
    alert(`${nomeFavorito} já está nos favoritos.`);
  }
};


  const nomeCidadeExibida =
    clima?.location.name.toLowerCase() === 'san paulo'
      ? 'São Paulo'
      : clima?.location.name || ''

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 6,
        px: 2,
        bgcolor: '#f0f4f8',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1976d2' }}
      >
        Consulta de Clima
      </Typography>

      <Box
        display="flex"
        gap={2}
        mb={3}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <InputTexto
          label="Cidade"
          valor={cidade}
          aoAlterar={e => setCidade(e.target.value)}
          larguraTotal
        />
        <Botao texto="Buscar" aoClicar={buscarClima} desabilitado={carregando} />
        {/* Botão favoritar só aparece se o clima estiver carregado */}
        {clima && (
          <Button variant="contained" color="secondary" onClick={favoritarCidade}>
            Favoritar
          </Button>
        )}
      </Box>

      {carregando && (
        <Box display="flex" justifyContent="center" mb={3}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {erro && (
        <Alert severity="error" sx={{ mb: 3, fontWeight: 'medium' }}>
          {erro}
        </Alert>
      )}

      {clima && (
        <>
          <CartaoClima
            dados={{
              localizacao: nomeCidadeExibida,
              temperatura_c: clima.current.temp_c,
              condicao: {
                texto: clima.current.condition.text,
                icone: clima.current.condition.icon,
              },
              umidade: clima.current.humidity,
              vento_kph: clima.current.wind_kph,
            }}
          />

          <Typography variant="h6" mt={6} mb={3} sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Previsão para os próximos dias:
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
            {clima.forecast.forecastday.map(dia => (
              <Card
                key={dia.date}
                sx={{
                  flex: '1 1 280px',
                  maxWidth: 320,
                  bgcolor: '#e3f2fd',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  py: 2,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1 }}>
                    {dia.date}
                  </Typography>
                  <img
                    src={dia.day.condition.icon}
                    alt={dia.day.condition.text}
                    style={{ width: 64, height: 64, marginBottom: 8 }}
                  />
                  <Typography sx={{ mb: 1, fontWeight: 'medium' }}>
                    {dia.day.condition.text}
                  </Typography>
                  <Typography color="text.secondary">Mín: {dia.day.mintemp_c}°C</Typography>
                  <Typography color="text.secondary">Máx: {dia.day.maxtemp_c}°C</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Container>
  )
}

export default Home

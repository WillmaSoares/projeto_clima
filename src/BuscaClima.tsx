import { useState, useEffect } from "react";
import type { ClimaCompleto } from "./interfaces/ClimaCompleto";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { fetchWeatherData } from "./apiClima";

export function BuscaClima() {
  const [cidade, setCidade] = useState("London");
  const [dadosClima, setDadosClima] = useState<ClimaCompleto | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  const obterClima = async () => {
    if (!cidade.trim()) {
      setMensagemErro("Digite uma cidade, região ou país para buscar.");
      setDadosClima(null);
      return;
    }

    setCarregando(true);
    setMensagemErro(null);

    try {
      const dados = await fetchWeatherData(cidade);
      setDadosClima(dados);
    } catch {
      setMensagemErro("Não foi possível encontrar o local. Tente novamente.");
      setDadosClima(null);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    obterClima();
  }, []);

  return (
    <Box maxWidth={800} margin="auto" padding={3}>
      <Typography variant="h4" gutterBottom>
        Clima Atual e Previsão
      </Typography>

      <Box display="flex" gap={2} alignItems="center" marginBottom={2}>
        <TextField
          label="Cidade, região ou país"
          variant="outlined"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          fullWidth
          disabled={carregando}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={obterClima}
          disabled={carregando}
        >
          {carregando ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Buscar"
          )}
        </Button>
      </Box>

      {mensagemErro && (
        <Typography color="error" marginBottom={2}>
          {mensagemErro}
        </Typography>
      )}

      {dadosClima && (
        <>
          {/* Clima Atual */}
          <Box
            padding={2}
            border="1px solid #ccc"
            borderRadius={2}
            marginBottom={3}
          >
            <Typography variant="h5" gutterBottom>
              {dadosClima.location.name}, {dadosClima.location.region},{" "}
              {dadosClima.location.country}
            </Typography>
            <Typography>Hora local: {dadosClima.location.localtime}</Typography>
            <Typography>Temperatura: {dadosClima.current.temp_c} °C</Typography>
            <Box display="flex" alignItems="center" mt={1} mb={1}>
              <Typography>Condição: {dadosClima.current.condition.text}</Typography>
              <img
                src={"https:" + dadosClima.current.condition.icon}
                alt={dadosClima.current.condition.text}
                style={{ marginLeft: 10 }}
              />
            </Box>
            <Typography>Vento: {dadosClima.current.wind_kph} km/h</Typography>
            <Typography>Umidade: {dadosClima.current.humidity}%</Typography>
          </Box>

          {/* Previsão dos próximos dias */}
          <Typography variant="h6" gutterBottom>
            Previsão para os próximos dias
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {dadosClima.forecast.forecastday.map((dia) => (
              <Card key={dia.date} sx={{ minWidth: 200 }}>
                <CardContent>
                  <Typography variant="subtitle1">{dia.date}</Typography>
                  <img
                    src={"https:" + dia.day.condition.icon}
                    alt={dia.day.condition.text}
                    width={40}
                  />
                  <Typography>{dia.day.condition.text}</Typography>
                  <Typography>Mín: {dia.day.mintemp_c} °C</Typography>
                  <Typography>Máx: {dia.day.maxtemp_c} °C</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

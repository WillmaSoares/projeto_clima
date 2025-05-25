// src/apiClima.ts
import axios from "axios";
import type { ClimaCompleto } from "./interfaces/ClimaCompleto";

const API_KEY = import.meta.env.VITE_API_KEY;


const nomesPermitidos: Record<string, string> = {
  "inglaterra": "London",
  "londres": "London",
  "joao pessoa": "João Pessoa" 
};


export const fetchWeatherData = async (
  cidade: string
): Promise<ClimaCompleto> => {
  const cidadeFormatada = cidade.trim().toLowerCase();
  const consulta = nomesPermitidos[cidadeFormatada] || cidade;

  const response = await axios.get("https://api.weatherapi.com/v1/forecast.json", {
    params: {
      key: API_KEY,
      q: consulta,
      days: 3,
      aqi: "no",
      alerts: "no",
      lang: "pt",
    },
  });

  return response.data;
};

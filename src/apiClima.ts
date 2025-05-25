// src/apiClima.ts
import axios from "axios";
import type { ClimaCompleto } from "./interfaces/ClimaCompleto";

const API_KEY = "8673413a4d6e40bbba611711252505";

const nomesPermitidos: Record<string, string> = {
  "inglaterra": "London",
  "londres": "London",
  "joao pessoa": "João Pessoa" 
};

export const fetchWeatherData = async (
  cidade: string
): Promise<ClimaCompleto> => {
  try {
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
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    throw new Error("Não foi possível obter os dados do clima.");
  }
};

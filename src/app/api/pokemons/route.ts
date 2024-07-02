import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (request: Request) => {
  const totalPokemon = 151;

  try {
    const allPokemonData = [];
    for (let i = 1; i <= totalPokemon; i++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
      const speciesResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${i}`
      );
      const koreanName = speciesResponse.data.names.find(
        (name: any) => name.language.name === "ko"
      );
      allPokemonData.push({ ...response.data, korean_name: koreanName.name });
    }

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};

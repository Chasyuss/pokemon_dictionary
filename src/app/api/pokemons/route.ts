import axios from "axios";
import { NextResponse } from "next/server";

const TOTAL_POKEMON = 151;

export const GET = async (request: Request) => {
  try {
    const allPokemonPromises = Array.from(
      { length: TOTAL_POKEMON },
      async (_, index) => {
        const id = index + 1;
        try {
          const [response, speciesResponse] = await Promise.all([
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
          ]);

          const koreanName = speciesResponse.data.names.find(
            (name: any) => name.language.name === "ko"
          );

          return {
            ...response.data,
            korean_name: koreanName?.name || null,
          };
        } catch (error) {
          console.error(`Failed to fetch data for Pokemon #${id}:`, error);
          return null; // 실패한 요청은 null을 반환
          // return throw;
        }
      }
    );

    const allPokemonData = (await Promise.all(allPokemonPromises)).filter(
      Boolean
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};

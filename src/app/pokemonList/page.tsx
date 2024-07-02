"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

const page: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("/api/pokemons");
        if (!response.ok) {
          throw new Error("불러오기 에러 ");
        }
        const data: Pokemon[] = await response.json();
        setPokemons(data);
      } catch (error) {
        setError("데이터 에러 ");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4"> 포켓몬 도감 </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 m-4">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="bg-black p-4 rounded-lg text-center text-white cursor-pointer"
          >
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
              className="mb-2 mx-auto"
            />
            <div className="font-bold">{pokemon.korean_name}</div>
            <div className="text-sm">{pokemon.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;

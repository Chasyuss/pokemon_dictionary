import Image from "next/image";

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

const fetchDetailData = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`); //절대 경로 사용
  if (!response) {
    throw new Error("데이터 불러오기 에러");
  }
  return await response.json();
};

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  // params를 써야함
  // useClient에서는 custom hook 사용

  const pokemon: Pokemon = await fetchDetailData(params.id);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        {pokemon.korean_name} ({pokemon.name})
      </h1>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <div className="mt-4">
        <p>
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight}
        </p>
        <h2 className="text-xl font-semibold mt-4">Types</h2>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>
              {type.type.korean_name} ({type.type.name})
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-4">Abilities</h2>
        <ul>
          {pokemon.moves.map((move, index) => (
            <li key={index}>{move.move.korean_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;

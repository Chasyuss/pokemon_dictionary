import Image from "next/image";
import Link from "next/link";

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
  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  if (!response) {
    throw new Error("데이터 불러오기 에러");
  }
  return await response.json();
};

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  const pokemon: Pokemon = await fetchDetailData(params.id);
  const formattedId = pokemon.id.toString().padStart(3, "0");

  return (
    <div className="max-w-md mx-auto p-4 text-center border rounded-lg m-4 bg-black text-white">
      <h1 className="text-xl font-bold mb-4">{pokemon.korean_name}</h1>
      <div> NO. {formattedId}</div>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={96}
        height={96}
        className="mx-auto"
      />
      <div className="mt-4">
        <p> 이름: {pokemon.korean_name} </p>
        <p>
          {" "}
          키: {pokemon.height}m 무게: {pokemon.weight} kg
        </p>
        <h2 className="text-s mt-4"> 타입 </h2>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.korean_name}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mt-4"> 기술 </h2>
        <ul className="flex flex-wrap justify-center space-x-2">
          {pokemon.moves.map((move, index) => (
            <li key={index} className="break-keep">
              {move.move.korean_name}
            </li>
          ))}
        </ul>
        <Link href="/">
          <div className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            뒤로가기
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetail;

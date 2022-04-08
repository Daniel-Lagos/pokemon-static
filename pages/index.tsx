import { GetStaticProps, NextPage } from 'next';
import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado titulos">
      <ul>
        {
          pokemons.map((pokemon, index) =>
            <li key={index}>
              #{index + 1} {'->'} {pokemon.name}
            </li>
          )
        }
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index +
    1}.svg`
  }));
  return {
    props: {
      pokemons
    }
  };
};

export default HomePage;

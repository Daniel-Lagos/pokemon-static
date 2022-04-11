import { GetStaticProps, NextPage } from 'next';
import { Grid } from '@nextui-org/react';
import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado titulos">
      <Grid.Container gap={2} justify={'flex-start'}>
        {
          pokemons.map((pokemon) =>
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          )
        }
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=600');
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

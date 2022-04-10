import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';
import { Pokemon, Species } from '../../interfaces';
import { localFavorites } from '../../utils';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

interface Props {
  pokemon: Pokemon;
}

interface NamePaths {
  results: Species[];
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorite, setIsInFavorite] = useState(
    localFavorites.existsInFavorites(pokemon.id));


  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorite(!isInFavorite);

    if (isInFavorite) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      }
    });

  };

  return (
    <Layout title={pokemon.name}>

      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon?.sprites?.other?.dream_world.front_default ||
                '/no-image.png'} alt={pokemon.name}
                width={'100%'}
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform={'capitalize'}>{pokemon.name}</Text>
              <Button color={'gradient'}
                      ghost={!isInFavorite}
                      onClick={onToggleFavorite}>
                {
                  isInFavorite ? 'remove from favorites' : 'save in favorites'
                }
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container display={'flex'} gap={2}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  height={100} width={100}/>

                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  height={100} width={100}/>

                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  height={100} width={100}/>

                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  height={100} width={100}/>
              </Container>
            </Card.Body>

          </Card>
        </Grid>
      </Grid.Container>


    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {

  const { data: { results } } = await pokeApi.get<NamePaths>(
    `/pokemon?limit=151`);

  const pokemons151 = results.map((pokemon) => `${pokemon.name}`);

  return {
    paths: pokemons151.map(name => ({
      params: { name }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };


  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

  return {
    props: {
      pokemon: data
    }
  };
};

export default PokemonByNamePage;

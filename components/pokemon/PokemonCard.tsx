import { Card, Grid, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from '../../interfaces';
import { FC } from 'react';
import { useRouter } from 'next/router';

interface PokemonProps {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<PokemonProps> = ({ pokemon }) => {

  const router = useRouter();

  const onClick = () => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} onClick={onClick}>
      <Card hoverable clickable>
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            src={pokemon.img}
            width={'100%'}
            height={'140px'}
          />
        </Card.Body>
        <Card.Footer>
          <Row justify={'space-between'}>
            <Text transform={'capitalize'}>{pokemon.name}</Text>
            <Text>#{pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

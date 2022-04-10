import { Container, Image, Text } from '@nextui-org/react';
import { FC } from 'react';

export const NoFavorites: FC = (): JSX.Element => {
  return (
    <Container css={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 100px)',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    }}>
      <Text h1>there arent Favorites</Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        width={250}
        height={250}
        alt={'there are not Favorites'}
        css={{
          opacity: 0.1
        }}
      />
    </Container>
  );
};

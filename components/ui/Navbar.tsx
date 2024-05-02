import NextLink from 'next/link';
import { Spacer, useTheme, Text, Link } from '@nextui-org/react';
import { FC } from 'react';

export const Navbar: FC = () => {

  const { theme } = useTheme();

  return (
    <div style={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0px 60px',
      backgroundColor: theme?.colors.gray900.value
    }}>
      <NextLink href={'/'} passHref>
        <Link>
          <Text color="white" h2>P</Text>
          <Text color="white" h3>okemon</Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }}/>

      <NextLink href={'/favorites'} passHref>
        <Link>
          <Text h3>Favoritos</Text>
        </Link>
      </NextLink>
    </div>
  );
};

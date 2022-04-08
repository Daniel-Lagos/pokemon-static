import { GetStaticProps, NextPage } from 'next';
import { Button } from '@nextui-org/react';
import { Layout } from '../components/layouts';
import { pokeApi } from '../api';

const HomePage: NextPage = (props) => {
  return (
    <Layout title="Listado titulos">
      <Button color={'gradient'}>Hola Mundo</Button>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {

  const { data } = await pokeApi.get('/pokemon?limit=151');

  return {
    props: {
      pokemons: data.results
    }
  };
};

export default HomePage;

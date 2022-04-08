import { GetStaticProps, NextPage } from 'next';
import { Button } from '@nextui-org/react';
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layout title="Listado titulos">
      <Button color={'gradient'}>Hola Mundo</Button>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('hola');
  return {
    props: {
      name: 'Daniel'
    }
  };
};

export default HomePage;

import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";
import { Layout } from "../../components/layouts";
import { PokemonListResponse, SmallPokemon } from "../../interfaces";
import { PokemonCard } from "../../components/pokemon";
import { pokeApi } from "../../api";
import AdsProvider from "../test/contexts/AdsProvider";

interface Props {
  pokemons: SmallPokemon[];
}

const AdPage: NextPage<Props> = ({ pokemons }) => {
  return (
    <AdsProvider page="ads">
      <Layout title="Listado titulos">
        <Grid.Container gap={2} justify={"flex-start"}>
          {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </Grid.Container>
        <p>Divider</p>
        <div
          id="megabanner-top"
          style={{ width: "928px", height: "220px" }}
        ></div>
        <div
          id="megabanner-middle-des"
          style={{ width: "928px", height: "220px" }}
        ></div>
        <div>
          <p>
            SRA request #2 in <span id="seconds">5</span> seconds...
          </p>
        </div>
        <div id="slot-3" style={{ height: "250px", width: "300px" }}></div>
        <div id="slot-4" style={{ height: "250px", width: "300px" }}></div>
        <div id="slot-5" style={{ height: "250px", width: "300px" }}></div>
      </Layout>
    </AdsProvider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=24");
  const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
    ...poke,
    id: index + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      index + 1
    }.svg`,
  }));
  return {
    props: {
      pokemons,
    },
  };
};

export default AdPage;

import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import { pokeApi } from "../api";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";
import { ADS_NAME } from "./test/constants/ad";
import Ad from "./test/hooks/ads/Ad";
import { positionAlternateAds } from "./test/ads";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  // console.log(`${ADS_NAME}_Detail/Robapagina_Top`)

  const Slots = {
    xs: [2, 5, 10, 13, 18, 20],
    sm: [4, 5, 13, 14, 20, 21],
    xl: [4, 6, 13, 14, 20, 22],
  };

  return (
    <Layout title="Listado titulos">
      <Ad
        slotId="expandible"
        classes={{
          root: "root-ad-expandible-container",
          adSlot: "ad-expandible-container",
        }}
        adUnit={`${ADS_NAME}_Detail/Expandible_Top`}
        sizes={[
          [970, 90],
          [728, 90],
          [970, 70],
          [970, 415],
          [970, 250],
        ]}
        sizeMapping={[
          [
            [600, 480],
            [
              [728, 90],
              [970, 70],
              [970, 90],
              [970, 250],
              [970, 415],
            ],
          ],
          [[0, 0], []],
        ]}
      />
      <Grid.Container gap={2} justify={"flex-start"}>
        {pokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}

        <Ad
          slotId="robapagina-top-aside"
          sizes={[
            [300, 250],
            [300, 300],
          ]}
          sizeMapping={[
            [
              [1280, 0],
              [
                [300, 250],
                [300, 300],
              ],
            ],
            [[960, 0], []],
            [[0, 0], []],
          ]}
          adUnit={`${ADS_NAME}_Detail/Robapagina_Top`}
        />
        {/* {
          Slots.xl.map((slot) => {
            const currentAd = positionAlternateAds.desktop[slot];
            return (
            <Ad
              key={currentAd.slotId}
              slotId={`slot-${currentAd.slotId}`}
              sizes={currentAd.sizes}
              adUnit={currentAd.adName}
              isFluid={currentAd.isFluid}
            />
          )})
        } */}
      </Grid.Container>
      <p>Divider</p>
      <div id="banner-ad-1" style={{width: "928px", height: "220px"}}></div>
      <div id="banner-ad-2" style={{width: "928px", height: "220px"}}></div>
    </Layout>
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

export default HomePage;

import Head from 'next/head';
import React, { FC } from 'react';
import { Navbar } from '../ui/Navbar';

interface LayoutProps {
  title: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<LayoutProps> = ({ children, title }) => {


  return (
    <>
      <Head>
        <title> {title || 'Pokemon App'} </title>
        <meta name="author" content="Daniel Lagos"/>
        <meta name="description" content="Informacion de XXXXX"/>
        <meta name="keywords" content="XXXXX, pokemon, pokedex"/>

        <meta property="og:title" content={`information about ${title}`}/>
        <meta property="og:description"
              content={`this page is about ${title}`}/>
        <meta property="og:image"
              content={`${origin}/images/banner.png`}/>
      </Head>
      <Navbar/>
      <main style={{
        padding: '0 50px'
      }}>
        {children}
      </main>
    </>
  );
};

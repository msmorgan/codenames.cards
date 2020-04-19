import React from "react";
import Head from "next/head";

export default () => {
  return (
    <Head>
      <title>Codenames</title>
      <link rel="shortcut icon" href="/favicon.png" />
      <meta property="og:title" content="codenames.cards" />
      <meta property="og:description" content="Play Codenames online." />
      <meta
        property="og:image"
        content="https://codenames.cards/og-image.png"
      />
      <meta property="og:url" content="https://codenames.cards" />
      <meta name="twitter:title" content="Codenames.cards" />
      <meta name="twitter:description" content="Play Codenames online." />
      <meta
        name="twitter:image"
        content="https://codenames.cards/og-image.png"
      />
      <meta name="twitter:card" content="summary_large_image"></meta>
    </Head>
  );
};
// in src/pages/setup.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import 'tailwindcss/tailwind.css';

const Setup: NextPage = () => {
  return (
    <div className="p-4">
      <Head>
        <title>Setup Page</title>
        <meta name="description" content="Setup configuration page." />
      </Head>
      <h1 className="text-xl font-bold">Setup</h1>
      <p className="mt-2">This is the setup page for our project.</p>
    </div>
  );
};

export default Setup;

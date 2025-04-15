import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import CountryList from '../components/CountryList';

export default function Home() {
  return (
    <div className="p-6 flex flex-col gap-6 ">
      <Header />
      <CountryList />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Tabs from './Components/Tabs';
import { useLocation } from 'react-router-dom';
import { db } from './../../../utils/index';
import { Ideas } from '../../../utils/schema';
import { desc } from 'drizzle-orm';
import IdeaList from './Components/IdeaList';

function HomeScreen() {
  const params = useLocation();
  const [ideaList, setIdeaList] = useState([]);

  useEffect(() => {
    GetAllIdeas();
  }, [params]);

  const GetAllIdeas = async () => {
    const result = await db.select().from(Ideas)
      .orderBy(desc(params.hash === '#hot' || params.hash === '#top' ? Ideas.vote : Ideas.id))
      .limit(20);

    setIdeaList(result);
  };

  return (
    <div>
      <Header />
      <Hero />
      <Tabs />
      <IdeaList ideaList={ideaList} refreshData={GetAllIdeas} />
    </div>
  );
}

export default HomeScreen;

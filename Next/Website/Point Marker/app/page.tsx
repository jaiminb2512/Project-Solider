"use client";

import Like from './Components/Like'
import Search from './Components/Search'

export default function Home() {
  return (

    <div className=" flex ">
      <div><Like /></div>
      <div className="py-5 pl-4 w-[100vw] h-[10vh]">
        <div><Search/></div>
      </div>
    </div>
  );
}

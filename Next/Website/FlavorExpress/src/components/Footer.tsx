import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">FlavorExpress</Link>
      <p>Thanks to <b><a href="https://www.youtube.com/@LamaDev" target="_blank">Lama Dev</a></b></p>
    </div>
  );
};

export default Footer;

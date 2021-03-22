import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <div className="w-screen flex p-4 bg-gray-300 justify-between">
      <Link href="/"><span className="cursor-pointer hover:text-blue-500">Home</span></Link>
      <button className="hover:text-blue-500">Logout</button>
    </div>
  )
}
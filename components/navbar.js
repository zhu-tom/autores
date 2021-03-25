import Link from 'next/link';
import React from 'react';
import { useUser } from '../lib/hooks';

export default function NavBar() {
  const {error} = useUser();

  return (
    <div className="w-screen flex p-4 bg-gray-300 justify-between">
      <Link href="/"><span className="cursor-pointer hover:text-blue-500">Home</span></Link>
      <Link href={error ? "/login" : "/account"}>
        <span className="hover:text-blue-500 cursor-pointer">{error ? "Log In" : "Account"}</span>
      </Link>
    </div>
  )
}
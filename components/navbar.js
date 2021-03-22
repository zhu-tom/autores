import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function NavBar() {
  const router = useRouter();
  const logout = () => {
    axios.delete("/api/auth")
      .then(() => {
        router.push("/login");
      })
  }
  return (
    <div className="w-screen flex p-4 bg-gray-300 justify-between">
      <Link href="/"><span className="cursor-pointer hover:text-blue-500">Home</span></Link>
      <button className="hover:text-blue-500" onClick={() => logout()}>Logout</button>
    </div>
  )
}
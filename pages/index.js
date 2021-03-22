import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../lib/hooks';

export default function Home() {
  const [user] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const logout = () => {
    axios.delete("/api/auth")
      .then(() => {
        router.push("/login");
      })
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-col flex items-center">
        <div className="m-2">
          <Link href="/clubs/105/slots">
            <span className="bg-blue-500 rounded-lg text-white py-2 px-3 cursor-pointer">Book Workout</span>
          </Link>
        </div>
        <button className="m-2 py-2 px-3 rounded-lg text-white bg-red-500" onClick={() => logout()}>Logout</button>
      </div>
    </div>
    
  );
}

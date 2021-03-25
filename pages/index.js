import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/layout';
import { useUser } from '../lib/hooks';

export default function Home() {
  const {error, mutate} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (error) router.push("/login");
  }, [error]);

  const logout = () => {
    axios.delete("/api/auth")
      .then(() => {
        mutate({});
        router.push("/login");
      })
  }

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <div className="flex-col flex items-center">
          <div className="m-2">
            <Link href="/clubs/105/slots">
              <span className="bg-blue-500 rounded-lg text-white py-2 px-3 cursor-pointer">Book Workout</span>
            </Link>
          </div>
          <button className="m-2 py-2 px-3 rounded-lg text-white bg-red-500" onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </Layout>
    
    
  );
}

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../lib/hooks";

const Login = () => {
  const router = useRouter();
  const [user] = useUser();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();

    axios.post("/api/auth", {
      login: e.currentTarget.login.value, 
      password: e.currentTarget.password.value
    })
      .then(res => {
        router.push("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex-column">
        <h1 className="text-center text-2xl font-bold">Sign In</h1>
        <form className="flex-column" onSubmit={handleSubmit}>
          <div className="flex justify-end items-center my-2">
            <label className="mr-2" htmlFor="login">Login:</label>
            <input className="rounded-lg border-2 p-2" type="text" name="login"/>
          </div>
          <div className="flex justify-end items-center my-2">
            <label className="mr-2" htmlFor="password">Password:</label>
            <input className="rounded-lg border-2 p-2" type="password" name="password"/>
          </div>
          <div className="flex justify-end items-center my-2">
            <button type="submit" className="bg-blue-500 text-white px-3 py-2 border-2 rounded-lg">Sign In</button>
          </div>
        </form>
      </div>
    </div>
    
  );
}

export default Login;
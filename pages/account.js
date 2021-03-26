import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
import Layout from "../components/layout";
import { useUser } from "../lib/hooks";

// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Account() {
  const { user, error, mutate } = useUser();
  const router = useRouter();

  // const [isPaid, setIsPaid] = useState(false);
  
  useEffect(() => {
    if (error) router.push("/login");
    // else if (user) setIsPaid(user.type === ACCOUNT_TYPE.PAID);
  }, [user])

  const logout = () => {
    axios.delete("/api/auth")
      .then(() => {
        mutate({});
        router.push("/login");
      })
  }

  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           currency_code: "CAD",
  //           value: "7.00"
  //         }
  //       }
  //     ]
  //   })
  // }

  // const onApprove = (data, actions) => {
  //   return actions.order.capture().then(details => {
  //     axios.post("/api/payment").then(res => {
  //       mutate(res.data);
  //     });
  //   });
  // }

  return (
      <Layout>
        <button className="bg-red-500 rounded-lg py-2 px-3 text-white" onClick={() => logout()}>Logout</button>
      </Layout>
    
  );
}
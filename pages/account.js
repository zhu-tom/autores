import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Layout from "../components/layout";
import { useUser } from "../lib/hooks";
import { ACCOUNT_TYPE } from "../util/types";

const PayPalButton = paypal.Buttons.driver("react", {React, ReactDOM});

export default function Account() {
  const { user, error} = useUser();
  const router = useRouter();

  const [isPaid, setIsPaid] = useState(false);
  
  useEffect(() => {
    if (error) router.push("/login");
    setIsPaid(user.type === ACCOUNT_TYPE.PAID);
  }, [user])

  const logout = () => {
    axios.delete("/api/auth")
      .then(() => {
        router.push("/login");
      })
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "CAD",
            value: "5.00"
          }
        }
      ]
    })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      axios.post("/api/payment").then(res => {

      });
    });
  }

  return (
    <Layout>
      <button onClick={() => logout()}>Log Out</button>
      {isPaid ? (
        <p>Already Paid</p>
      ) : (
        <PayPalButton
          createOrder={createOrder}
          onApprove={onApprove}
        />
      )}
    </Layout>
  );
}
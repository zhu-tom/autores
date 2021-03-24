import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useUser } from "../lib/hooks";
import { ACCOUNT_TYPE } from "../util/types";

const PayPalButton = paypal.Buttons.driver("react", {React, ReactDOM});

export default function Account() {
  const { user } = useUser();

  const [isPaid, setIsPaid] = useState(false);
  
  useEffect(() => {
    setIsPaid(user.type === ACCOUNT_TYPE.PAID);
  }, [user])

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

  return isPaid ? (
    <p>Already Paid</p>
  ) : (
    <PayPalButton
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
}
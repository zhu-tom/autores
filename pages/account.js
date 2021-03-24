import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

const PayPalButton = paypal.Buttons.driver("react", {React, ReactDOM});

export default function Account() {
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
    <PayPalButton
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
}
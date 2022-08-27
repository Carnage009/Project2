import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "black",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "black",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const Form = styled.form`
  width: 30%;
  background-color: lightblue;
  height: 100px;
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = element.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        toast.error(error.message);
      } else {
        const result = await axios.post("http://localhost:8888/pay", {
          price: totalPrice,
          id: paymentMethod.id,
        });
        toast.success(result.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button disabled={!stripe}>Оплатить</button>
    </Form>
  );
};

export default CheckoutForm;

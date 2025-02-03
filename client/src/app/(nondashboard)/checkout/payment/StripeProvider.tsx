import React, { useEffect, useState } from "react";
import {
  Appearance,
  loadStripe,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useCreateStripePaymentIntentMutation } from "@/state/api";
import Loading from "@/components/Loading";
import { Elements } from "@stripe/react-stripe-js";

// Ensure the Stripe public key is set
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#18181b",
    colorText: "#d2d2d2",
    colorDanger: "#df1b41",
    colorTextPlaceholder: "#6e6e6e",
    fontFamily: "Inter, system-ui, sans-serif",
    spacingUnit: "3px",
    borderRadius: "10px",
    fontSizeBase: "14px",
  },
};

const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSecret, setClientSecret] = useState<string | "">("");
  const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
  const { course } = useCurrentCourse();

  useEffect(() => {
    if (!course) return;

    const fetchPaymentIntent = async () => {
      try {
        const result = await createStripePaymentIntent({
          amount: course?.price ?? 0, // Ensure amount is a valid number
        }).unwrap();
        setClientSecret(result.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    fetchPaymentIntent();
  }, [createStripePaymentIntent, course]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };
  if (!clientSecret) return <Loading />;
  return (
    <Elements stripe={stripePromise} options={options} key={clientSecret}>
      {children}
    </Elements>
  );
};

export default StripeProvider;

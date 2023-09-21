// PAYMOB

import {
  CARD_INTEGRATION_ID,
  IFRAME_ID,
  PAYMOB_API_KEY,
} from "@/config/paymob-config";

// STEP ONE
export const startPaymentProcess = async (
  amount,
  currency,
  plan,
  endDate,
  firstName,
  lastName,
  email,
  phoneNumber,
  userId,
  purchaseDate,
  paymentMethod
) => {
  let data = {
    api_key: PAYMOB_API_KEY,
  };

  let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let response = await request.json();

  let token = response.token;

  console.log(
    "first step",
    token,
    amount,
    currency,
    plan,
    endDate,
    firstName,
    lastName,
    email,
    phoneNumber
  );

  if (token) {
    secondStep({
      token,
      amount,
      currency,
      plan,
      endDate,
      firstName,
      lastName,
      email,
      phoneNumber,
      userId,
      purchaseDate,
      paymentMethod,
    });
  }
};

// STEP TWO
export const secondStep = async ({
  token,
  amount,
  currency,
  plan,
  endDate,
  firstName,
  lastName,
  email,
  phoneNumber,
  userId,
  purchaseDate,
  paymentMethod,
}) => {
  let data = {
    auth_token: token,
    delivery_needed: "false",
    amount_cents: (amount * 100).toString(),
    // currency: "EGP",
    currency: currency,
    items: [
      {
        name: plan,
        amount_cents: (amount * 100).toString(),
        description: `Ends at ${endDate}`,
        quantity: "1",
      },
    ],
    shipping_data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      extra_description: userId.toString(), // extra_description = userId
      building: purchaseDate, // building = purchaseDate
      city: endDate, // city = endDate
      floor: plan.toString(), // floor = plan
      postal_code: paymentMethod.toString(), // post_code = paymentMethod
    },
  };

  let request = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let response = await request.json();

  let id = response?.id;

  console.log(
    "second step",
    token,
    id,
    amount,
    firstName,
    lastName,
    email,
    phoneNumber,
    currency
  );

  if (id) {
    thirdStep(
      token,
      id,
      amount,
      firstName,
      lastName,
      email,
      phoneNumber,
      currency
    );
  }
};

// STEP THREE
export const thirdStep = async (
  token,
  id,
  amount,
  firstName,
  lastName,
  email,
  phoneNumber,
  currency
) => {
  let data = {
    auth_token: token,
    amount_cents: (amount * 100).toString(),
    expiration: 3600,
    order_id: id,
    billing_data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      apartment: "803",
      floor: "42",
      street: "Ethan Land",
      building: "8028",
      shipping_method: "PKG",
      postal_code: "01898",
      city: "Jaskolskiburgh",
      country: "CR",
      state: "Utah",
    },
    currency: currency,
    integration_id: CARD_INTEGRATION_ID,
  };

  let request = await fetch(
    "https://accept.paymob.com/api/acceptance/payment_keys",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  let response = await request.json();

  let finalToken = response.token;

  console.log(
    "third step",
    token,
    id,
    amount,
    firstName,
    lastName,
    email,
    phoneNumber,
    currency
  );

  if (finalToken) {
    console.log(finalToken);
    cardPayment(finalToken);
  }
};

// NOW YOU CAN USE THE finalToken from Step 3 in order to use any payment method

// CARD PAYMENT
export const cardPayment = async (finalToken) => {
  let iframeURL = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${finalToken}`;

  //   Go to the iframeURL
  location.href = iframeURL;
};

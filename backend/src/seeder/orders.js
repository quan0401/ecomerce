const orders = [
  {
    user: "61513aa2210b6e2e1c5c327d",
    orderTotal: {
      itemsCount: 3,
      cartSubTotal: 135,
    },
    cartItems: [
      {
        name: "Kitchen Knife",
        price: 45,
        image: {
          url: "/images/kitchen_knife.jpg",
        },
        quantity: 1,
        count: 1,
      },
      {
        name: "Dining Table",
        price: 60,
        image: {
          url: "/images/dining_table.jpg",
        },
        quantity: 1,
        count: 1,
      },
      {
        name: "Floor Lamp",
        price: 30,
        image: {
          url: "/images/floor_lamp.jpg",
        },
        quantity: 1,
        count: 1,
      },
    ],
    paymentMethod: "Credit Card",
    transactionResult: {
      status: "Paid",
      createTime: "2022-05-07T08:00:00.000Z",
      amount: 135,
    },
    isPaid: true,
    paidAt: "2022-05-07T08:05:00.000Z",
    isDelivered: false,
  },
  {
    user: "61513aa2210b6e2e1c5c327d",
    orderTotal: {
      itemsCount: 2,
      cartSubTotal: 100,
    },
    cartItems: [
      {
        name: "Sofa",
        price: 80,
        image: {
          url: "/images/sofa.jpg",
        },
        quantity: 1,
        count: 1,
      },
      {
        name: "Coffee Table",
        price: 20,
        image: {
          url: "/images/coffee_table.jpg",
        },
        quantity: 1,
        count: 1,
      },
    ],
    paymentMethod: "PayPal",
    transactionResult: {
      status: "Paid",
      createTime: "2022-05-06T08:00:00.000Z",
      amount: 100,
    },
    isPaid: true,
    paidAt: "2022-05-06T08:05:00.000Z",
    isDelivered: true,
    deliverAt: "2022-05-10T10:00:00.000Z",
  },
];

module.exports = orders;

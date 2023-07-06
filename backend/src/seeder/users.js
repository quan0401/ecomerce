const bcrypt = require("bcryptjs");
const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    country: "USA",
    city: "New York",
    address: "123 Main St",
    password: bcrypt.hashSync("quan1234", 10),
    isAdmin: true,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@example.com",
    phoneNumber: "0987654321",
    country: "Canada",
    city: "Toronto",
    address: "456 Queen St",
    password: bcrypt.hashSync("quan1234", 10),
    isAdmin: false,
  },
  {
    firstName: "Bob",
    lastName: "Smith",
    email: "bobsmith@example.com",
    phoneNumber: "5555555555",
    country: "UK",
    city: "London",
    address: "789 Oxford St",
    password: bcrypt.hashSync("quan1234", 10),
    isAdmin: false,
  },
  {
    firstName: "Alice",
    lastName: "Jones",
    email: "alicejones@example.com",
    phoneNumber: "1112223333",
    country: "Australia",
    city: "Sydney",
    address: "321 George St",
    password: bcrypt.hashSync("quan1234", 10),
    isAdmin: false,
  },
  {
    firstName: "David",
    lastName: "Lee",
    email: "davidlee@example.com",
    phoneNumber: "4445556666",
    country: "China",
    city: "Shanghai",
    address: "456 Nanjing Rd",
    password: bcrypt.hashSync("quan1234", 10),
    isAdmin: false,
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    email: "mariagarcia@example.com",
    phoneNumber: "7778889999",
    country: "Spain",
    city: "Madrid",
    address: "789 Gran Via",
    password: bcrypt.hashSync("quan1234", 10),
    isAdmin: true,
  },
];

module.exports = users;

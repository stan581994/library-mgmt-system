const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Library Mgmt API",
    description: "A simple Express library Mgmt API",
  },
  host: "localhost:3000",
  schemes: ["https", "http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

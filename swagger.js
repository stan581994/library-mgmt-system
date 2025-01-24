const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Library Mgmt API",
    description: "A simple Express library Mgmt API",
  },
  host: "library-mgmt-system-evmj.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

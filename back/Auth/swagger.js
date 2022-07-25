import libSwaggerAutogen from "swagger-autogen";

const swaggerAutogen = libSwaggerAutogen();

const doc = {
  info: {
    version: "1.0.0",
    title: "LMS Auth",
    description: "Документация для LMS - Auth сервиса",
  },
  host: "194.67.104.19:4800",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

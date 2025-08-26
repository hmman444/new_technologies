import express, { Express } from "express";

const configViewEngine = (app: Express): void => {
  app.use(express.static("./src/public")); // Set up static folder
  app.set("view engine", "ejs");           // Set EJS as template engine
  app.set("views", "./src/views");         // Views folder
};

export default configViewEngine;

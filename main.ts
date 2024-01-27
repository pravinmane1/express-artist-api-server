import express from "express";
import { connect } from "./db";
import * as artistsController from "./controller/artists";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.get("/artists", artistsController.all);
app.get("/artists/:id", artistsController.findById);
app.post("/artists", artistsController.create);
app.put("/artists/:id", artistsController.updateById);
app.delete("/artists/:id", artistsController.deleteById);

const startServer = async () => {
  await connect("mongodb://localhost:27017/api", "api");
  app.listen(3012, () => {
    console.log("api started");
  });
};

startServer();

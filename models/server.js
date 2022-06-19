const express = require("express");
const cors = require("cors");
const { mongoConnect } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.paths = {
      users: "/api/users",
    };
    this.mongoconnect();
    this.middleware();
    this.router();
    this.listen();
  }

  async mongoconnect() {
    await mongoConnect();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  router() {
    this.app.use(this.paths.users, require("../routers/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;

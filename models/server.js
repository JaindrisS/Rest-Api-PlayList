const express = require("express");
const cors = require("cors");
const { mongoConnect } = require("../db/config");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.paths = {
      artists: "/api/artists",
      genders: "/api/genders",
      users: "/api/users",
      lists: "/api/lists",
      auth: "/api/auth",
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
    this.app.use(this.paths.artists, require("../routers/artists"));
    this.app.use(this.paths.genders, require("../routers/genders"));
    this.app.use(this.paths.users, require("../routers/users"));
    this.app.use(this.paths.lists, require("../routers/lists"));
    this.app.use(this.paths.auth, require("../routers/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;

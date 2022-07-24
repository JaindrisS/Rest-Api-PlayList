const express = require("express");
const cors = require("cors");
const { mongoConnect } = require("../db/config");
const { client } = require("../middleware/cache");
const fileUpload = require("express-fileupload");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.paths = {
      artists: "/api/v1/artists",
      genders: "/api/v1/genders",
      users: "/api/v1/users",
      lists: "/api/v1/lists",
      auth: "/api/v1/auth",
      upload: "/api/v1/upload",
    };
    this.redisCacheConnect();
    this.mongoconnect();
    this.middleware();
    this.router();
    this.listen();
  }

  async redisCacheConnect() {
    await client.connect();
  }

  async mongoconnect() {
    await mongoConnect();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  router() {
    this.app.use(this.paths.artists, require("../v1/routers/artists"));
    this.app.use(this.paths.auth, require("../v1/routers/auth"));
    this.app.use(this.paths.genders, require("../v1/routers/genders"));
    this.app.use(this.paths.lists, require("../v1/routers/lists"));
    this.app.use(this.paths.upload, require("../v1/routers/upload-img"));
    this.app.use(this.paths.users, require("../v1/routers/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;

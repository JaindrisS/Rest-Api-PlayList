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
      artists: "/api/artists",
      genders: "/api/genders",
      users: "/api/users",
      lists: "/api/lists",
      auth: "/api/auth",
      upload: "/api/upload",
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
    this.app.use(this.paths.artists, require("../routers/artists"));
    this.app.use(this.paths.genders, require("../routers/genders"));
    this.app.use(this.paths.users, require("../routers/users"));
    this.app.use(this.paths.lists, require("../routers/lists"));
    this.app.use(this.paths.auth, require("../routers/auth"));
    this.app.use(this.paths.upload, require("../routers/upload-img"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;

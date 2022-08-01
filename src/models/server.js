const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { mongoConnect } = require("../db/config");
const swaggerUi = require("swagger-ui-express");
const { client } = require("../middleware/cache");
const swaggerDocument = require("../helpers/swagger.json");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.paths = {
      artists: "/my-playlists-api/v1/artists",
      genders: "/my-playlists-api/v1/genders",
      users: "/my-playlists-api/v1/users",
      lists: "/my-playlists-api/v1/lists",
      auth: "/my-playlists-api/v1/auth",
      upload: "/my-playlists-api/v1/upload",
    };
    this.listen();
    this.redisCacheConnect();
    this.mongoconnect();
    this.middleware();
    this.router();
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

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
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

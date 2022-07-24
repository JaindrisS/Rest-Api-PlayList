const { request, response } = require("express");
const { createClient } = require("redis");
const jwt = require("jsonwebtoken");

const client = createClient();

client.on("connect", () => {
  console.log("Redis connected");
});

client.on("error", (error) => {
  console.log("Redis error", error);
});

const sendToCache = async (keycache, timeexpire, data) => {
  const saveResult = await client.set(keycache, JSON.stringify(data), {
    timeexpire,
  });

  console.log("Result saved in cache");
};

const cache = async (req, res = response, next) => {
  const token = req.header("token");
  const { uid } = jwt.verify(token, process.env.JWTPRIVATEKEY);

  const reply = await client.get(uid);
  if (reply) {
    console.log("fron cache data");
    return res.status(200).json(JSON.parse(reply));
  }

  next();
};

module.exports = { sendToCache, cache, client };

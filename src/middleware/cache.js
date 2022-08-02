const { request, response } = require("express");
const { createClient } = require("redis");

const client = createClient({
  url: "redis://default:EU1phfrNatwdG0pqsPsivMxJeBwtIHNN@redis-16647.c16.us-east-1-2.ec2.cloud.redislabs.com:16647",
});

client.on("connect", () => {
  console.log("Redis connected");
});

client.on("error", (error) => {
  console.log("Redis error", error);
});

const sendToCache = async (keyCache, timeexpire, data) => {
  const saveResult = await client.set(keyCache, JSON.stringify(data), {
    EX: timeexpire,
  });

  console.log("Result saved in cache");
};
const cache = async (req, res = response, next) => {
  let keyCache = req.originalUrl;
  const reply = await client.get(keyCache);
  if (reply) {
    console.log("fron cache data");
    return res.status(200).json(JSON.parse(reply));
  }

  next();
};

module.exports = { sendToCache, cache, client };

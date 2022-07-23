const { request, response } = require("express");
const Cloudinary = require("cloudinary").v2;
Cloudinary.config(process.env.CLOUDINARY_URL);
const User = require("../models/user");
const Artist = require("../models/artist");

const uploadImg = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case "user":
      model = await User.findById(id);
      if (!model) {
        return res
          .status(400)
          .json(`the user with the id ${id} does not exist `);
      }

      break;
    case "artist":
      model = await Artist.findById(id);
      if (!model) {
        return res
          .status(400)
          .json(`the user with the id ${id} does not exist `);
      }
      break;
    default:
      return res.status(500).json({ msg: "Not implemented" });
      break;
  }

  // delete cloudinary preview image - if it is for a user with img

  if (model.img) {
    let nameArr = model.img.split("/");
    let ImgName = nameArr[nameArr.length - 1];
    let [publicId] = ImgName.split(".");
    await Cloudinary.uploader.destroy(publicId);
  }

  // save the new img in cloudiary
  const { tempFilePath } = req.files.file;
  const { secure_url } = await Cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();
  res.status(201).json(model);
};

module.exports = { uploadImg };

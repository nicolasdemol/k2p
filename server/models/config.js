const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  remotePath: String,
  localPath: String,
});

const Config = mongoose.model("Config", configSchema);

module.exports = Config;

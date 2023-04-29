const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
  name: { type: String, default: "مجهول", maxlength: [15, "متفوتش ال15 حرف"] },
  thought: {
    type: String,
    required: [true, "متخليش الميساج فارغ -_-"],
    maxlength: [60, "متفوتش ال60 حرف"],
  },
  creationDate: { type: Date, default: new Date() },
  style: { type: String, default: "Note1" },
  rotate: { type: Number, default: 0 },
});

const ThoughtModel = mongoose.model("Thoughts", ThoughtSchema);

module.exports = ThoughtModel;

const ThoughtModel = require("../models/Thought");
module.exports.postThought = async (req, res) => {
  try {
    function getRandomItem(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const item = arr[randomIndex];
      return item;
    }

    const Note = [
      "Note1",
      "Note2",
      "Note3",
      "Note4",
      "Note5",
      "Note6",
      "Note7",
      "Note8",
      "Note9",
      "Note10",
      "Note11",
      "Note12",
    ];

    const RandomNote = getRandomItem(Note);
    const RandomNumber = Math.floor(Math.random() * (10 - -10)) + -10;
    const newThought = new ThoughtModel({
      ...req.body,
      style: RandomNote,
      rotate: RandomNumber,
    });
    await newThought.save();
    res.send({ msg: "الفكرة تسجلت جوك باهي" });
  } catch (error) {
    res.status(400).send({ msg: error.message })
    
  }
};

module.exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await ThoughtModel.find({});

    res.send({ thoughts });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.deleteThought = async (req, res) => {
  try {
    const { thoughtID } = req.params;

    const deleteThought = await ThoughtModel.findByIdAndRemove(thoughtID);
    res.send({ msg: "thought deleted successfully" });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

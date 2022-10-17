const router = require("express").Router();
const { readFromFile, readAndAppend } = require("../../helpers/fsUtils");
const uuid = require("../../helpers/uuid");

// GET Route for notes
router.get("/", (req, res) => {
  console.info(`${req.method} request revived for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//  Post route for notes
router.post("/", (req, res) => {
  console.info(`${req.method} request recieved to add note`);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added");
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;

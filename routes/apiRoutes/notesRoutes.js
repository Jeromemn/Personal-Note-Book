const router = require("express").Router();
const { readFromFile,  writeToFile, readAndAppend } = require("../../helpers/fsUtils");
const uuid = require("../../helpers/uuid");
let notes = require('../../db/db.json');
const fs = require('fs');
// GET Route for notes
router.get("/", (req, res) => {
  console.info(`${req.method} request recieved for notes`);
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
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added");
  } else {
    res.error("Error in adding note");
  }
});



router.delete("/:id", (req, res) => {
  const id = req.params.id

  if (id) {
    notes = notes.filter((note) => note.id !== id)

    fs.writeFile(`./db/db.json`, JSON.stringify(notes, null, 4), (err) =>
      err
        ? console.error(err)
        : console.log(`Note with id ${id} has been deleted from JSON file`)
    )

    const response = {
      status: "success",
      id: id,
    }

    res.status(201).json(response)
  } else {
    res.status(500).json("Error deleting note")
  }
})

// router.delete('/:id', (req, res) => {
//   readFromFile('./db/db.json').then((data) => res. )
  
// });

module.exports = router;

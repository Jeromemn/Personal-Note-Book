const router = require("express").Router();
const { readFromFile, readAndAppend } = require("../../helpers/fsUtils");
const uuid = require("../../helpers/uuid");
// let notes = require('../../db/db.json');
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


//  delete note reads file before removing matching id
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  
  if (id) {
    const data = await readFromFile('./db/db.json');
    const notes =JSON.parse(data);
    const remaining = notes.filter((note) => note.id !== id);
    console.log('after; ', notes)
    fs.writeFileSync(`./db/db.json`, JSON.stringify(remaining, null, 4), (err) =>
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


module.exports = router;

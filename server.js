const express = require("express");
const routes = require("./routes");

const PORT = 3001;

const app = express();

// Middlewear for parsing json and URLencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(routes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

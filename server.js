const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  // console.log("listening");
  res.send(":D");
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});

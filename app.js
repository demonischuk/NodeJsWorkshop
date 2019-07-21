var express = require('express');
var app = express();

app.use("/v1", require("./Routers/GamesRouter"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
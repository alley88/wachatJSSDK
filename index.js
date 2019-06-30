const express  = require("express");
const app = express();
const path = require("path");
const wxRouter = require("./router");

app.use(express.static(path.join(__dirname,"./public")));
app.use("/wechat",wxRouter);

app.listen(9008);

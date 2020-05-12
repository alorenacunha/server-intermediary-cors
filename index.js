const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

const urls = "http://10.34.17.102:8000/pp2020";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.get("/status", (req, res) => {
  request({ url: urls + "/status" }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      return res.status(500).json({ type: "error", message: error.message });
    }

    res.json(JSON.parse(body));
  });
});
app.post("/verify_ndt_data/300", (req, res) => {
  request.post(
    {
      url: urls + "/verify_ndt_data/300",
      headers: { "content-type": "application/json" },
      json: true,
      body: req.body,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: response.statusMessage });
      }
      res.json(body);
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

const express = require("express");
const router = express.Router();
const request = require('async-request');

router.get("/browse", async (req, res) => {
  try {
    const page = req.query.page;
    const size = req.query.size;
    const url = process.env.BASE_URL_NASA + '/neo/rest/v1/neo/browse?api_key=' + process.env.NASA_KEY + '&page=' + page + '&size=' + size;
    const response = await request(url);
    res.json(JSON.parse(response.body));
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error, Please try after sometime.");
  }
});

router.get("/browse/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const url = process.env.BASE_URL_NASA + '/neo/rest/v1/neo/' + id + '?api_key=' + process.env.NASA_KEY;
    const response = await request(url);
    res.json(JSON.parse(response.body));
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error, Please try after sometime.");
  }
});

router.get("/feed", async (req, res) => {
  try {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const detailed = !(!req.query.detailed);
    const url = process.env.BASE_URL_NASA + '/neo/rest/v1/feed?api_key=' + process.env.NASA_KEY + '&detailed=' + detailed + '&start_date=' + start_date + '&end_date=' + end_date;
    const response = await request(url);
    res.json(JSON.parse(response.body));
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error, Please try after sometime.");
  }
});

module.exports = router;
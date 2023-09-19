const express = require("express");
const { DB } = require("./libs/mongo");
const router = express.Router();

router.get("/countries", async (req, res, next) => {
  try {
    const { name = "", pageNo = "0", pageSize = "10" } = req.query;

    const db = DB();

    const { data, count } = await db
      .collection("countries")
      .aggregate([
        {
          $match: {
            name: {
              $regex: name,
              $options: "i",
            },
          },
        },
        {
          $sort: {
            name: 1,
          },
        },
        {
          $facet: {
            data: [
              {
                $skip: pageNo * pageSize,
              },
              {
                $limit: +pageSize,
              },
            ],
            count: [
              {
                $count: "total",
              },
            ],
          },
        },
      ])
      .next();

    res.status(200).json({ data: { countries: data, totalCount: count[0].total } });
  } catch (error) {
    console.log(error);
    next({ st: 500, ms: error.message });
  }
});

router.use("*", (req, res) => {
  res.status(404).json({ error: "Not Found ❌" });
  console.log(new Error("Route Not Found ❌", { cause: req }));
});

router.use((error, req, res, next) => {
  res.status(error.st ?? 500).json({ error: error.ms ?? "Something went wrong ❗" });
  console.log(new Error(error.ms ?? "Something went wrong ❗", { cause: error }));
});

module.exports = router;

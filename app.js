const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
    })
);

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(
  "/api/fakeInsta",
  userRoutes,
  postRoutes,
);

app.get("/", (req, res) => {
    res.send({
      status_code: 200,
      status_message: "Success",
      message: "Welcome to fake-insta API",
    });
  });
  
  app.all("*", (req, res) =>
    res.status(404).json({
      statusText: "Not Found",
      message: "Route doesn't exist, please check youre Route again.",
    })
  );

  app.listen(process.env.PORT || 5000, () => {
    console.log(
      `SERVER IS RUNNING ON PORT 5000 || ENV PORT : ${process.env.PORT}`
    );
  });
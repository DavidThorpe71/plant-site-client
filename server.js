const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());
    server.get("/:plant", (req, res) => {
      const actualPage = "/individualPlant";
      const queryParams = { plant: req.params.plant };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => handle(req, res));
    server.listen(8080, err => {
      if (err) throw err;
      console.log(
        `>>> Ready on http://localhost:8080 in ${
          dev ? "development" : "production"
        } mode`
      );
    });
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

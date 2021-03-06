// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "Haiku Life Design";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const profileRoutes = require("./routes/profile.routes");
app.use("/", profileRoutes);
const thingshuiRoutes = require("./routes/thingshui.routes");
app.use("/", thingshuiRoutes);
const pathRoutes = require("./routes/path.routes");
app.use("/", pathRoutes);
const blueprintRoutes = require("./routes/blueprint.routes");
app.use("/", blueprintRoutes);
const stageRoutes = require("./routes/stage.routes");
app.use("/", stageRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

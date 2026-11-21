const owner = require("./ownerRoutes");
const buisnessFirms = require("./buisnessFrmRoutes");
const manager = require("./managerRoutes");
const worker = require("./workerRoutes");
const company = require("./companiesRoute");

exports.routeConfig = (app) => {
  app.use("/api/v1/owner", owner);
  app.use("/api/v1/firm/", buisnessFirms);
  app.use("/api/v1/company/", company);
  app.use("/api/v1/manager/", manager);
  app.use("/api/v1/worker/", worker);
};

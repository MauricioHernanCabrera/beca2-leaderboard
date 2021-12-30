const glob = require("glob");
const fs = require("fs");
const path = require("path");

const start = async () => {
  const baseRoute = __dirname;
  const routes = glob.sync(`${baseRoute}/dist/**/*.html`, {});
  console.log(`cache-clean: (${routes.length} route(s))`);
  console.log(baseRoute);

  routes.forEach(route => {
    console.log(route);
    const dataFounded = fs.readFileSync(route, "utf8");
    const dataUpdated = dataFounded.replace(/\.js"/g, `.js?id=${Date.now()}"`);
    fs.writeFileSync(route, dataUpdated);
  });
};

start();

const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 4444;
app.listen(port, () => {
  console.log(`App is running on the port ${port}`);
});

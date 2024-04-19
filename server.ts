import * as path from "path";
import express from "express";

const port = process.env.NX_APP_PORT;
const app = express();

// app.use(async (req: any, res, next) => {

//   next();
// });

app.listen(port, () => {
  console.log(`=================================`);
  console.log(`======= ENV: ${process.env.NODE_ENV} =======`);
  console.log(`🚀 App listening on the port ${port}`);
  console.log(`=================================`);

  // Server has started
});

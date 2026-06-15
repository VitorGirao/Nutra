import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = 3001;

app.listen(port, () => {
  console.log(`Nutra backend running on port ${port}`);
});

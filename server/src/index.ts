import { createApp } from "./app";
import { HOST, SERVER_PORT } from "./configs/config";

const app = createApp();

app.listen(SERVER_PORT, HOST, () => {
  console.log(`✅ Server is running on http://${HOST}:${SERVER_PORT}`);
});

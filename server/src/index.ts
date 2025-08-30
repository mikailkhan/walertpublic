import { createApp } from "./app";

const app = createApp();
const PORT = 3000; // REMOVE THIS AFTER .env setup
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

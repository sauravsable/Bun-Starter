const mongoose = require('mongoose');

module.exports = function connectDB() {
 try {
 mongoose.connect(process.env.DB_URL);
 } catch (error) {
  const castedError = error;
  console.error(castedError.message);
  process.exit(1);
 }

 mongoose.connection.once("open", (_) => {
  console.log(`Database connected`);
 });

 mongoose.connection.on("error", (err) => {
   console.error(`Database connection error: ${err}`);
 });

}

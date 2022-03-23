require('dotenv').config({ path: "./config.env" });
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const moment = require('moment');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./Middleware/errorsHandler');

const authRoutes = require('./Routes/auth');
const usersRoutes = require('./Routes/users');
const productRoutes = require('./Routes/product');
const cartRoutes = require('./Routes/cart');
const orderRoutes = require('./Routes/order');
const payRoutes = require('./Routes/stripe');

const logger = (req, res, next) => {
    console.log('middleware >>>>', `${req.protocol}://${req.get('host')}${req.originalUrl} --at--> ${moment().format()}`);
    next();
};
app.use(logger);

app.use(
    cors({
        origin: true
    }),
    bodyParser.json(),
    express.json(),
    cookieParser(),
    express.urlencoded({ extended: true })
);

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const dbURI = process.env.MONGO_DB_URI;
const dataConnection = async () => {
    await mongoose.connect(dbURI, options).then((result) => {
        console.log('MongoDB Connection Success 👍');
        server.listen(PORT, () => console.log(`server is running on ${PORT}`));
    }).catch((error) => console.log("MongoDB Connection Failed 💥", "<---->", error));
};
dataConnection();

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", payRoutes);

app.use(errorHandler);
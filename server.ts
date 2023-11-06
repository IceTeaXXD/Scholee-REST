import verifyJWT from "./middleware/verifyJWT";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sync } from "./polling/sync";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const cookies = require("cookie-parser");

const defaultroute = require("./routes/default.routes");
const OrganizationRoute = require("./routes/organization.routes");
const ScholarshipRoute = require("./routes/scholarship.routes");
const UniversityRoute = require("./routes/university.routes");
const authRoute = require("./routes/auth.routes")
const soapRoute = require("./routes/soap.routes");

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));
app.use(cookies());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(express.static("static"));
app.use(express.json());
app.use("/", defaultroute);
app.use("/api", authRoute);
app.use("/api", soapRoute);
app.use(verifyJWT);
// app.use("/api", soapRoute);
app.use("/api", UniversityRoute);
app.use("/api", ScholarshipRoute);
app.use("/api", OrganizationRoute);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    sync();
});

import express from "express";
import cors from "cors";
import { LoginSignupRouter } from "./routes/user.js";
import {TradeRouter} from "./routes/Trade.js";
import { OfferRouter } from "./routes/Offer.js";
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", LoginSignupRouter);
app.use("/trade", TradeRouter) ; 
app.use("/offer", OfferRouter) ; 

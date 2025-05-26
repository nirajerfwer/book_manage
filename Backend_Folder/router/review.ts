import { Request, Response, Router } from "express";
import { deleteReviews, updateReviews } from "../handler/reviews_handler";

const express = require("express");
const multer = require("multer");
const mymulter = multer();

const Rrouter = express.Router();

Rrouter.put("/:id", mymulter.none(), async (req: Request, res: Response) => {
  try {
    const reviewid = req.params.id;
    const body = req.body;
    const dataupdated = await updateReviews(reviewid, body);
    return res.status(200).send(dataupdated);
  } catch (err) {
    console.log("eror while updating reviews");
    return res.status(500).send({ message: "error while updating reviews" });
  }
});
Rrouter.delete("/:id", mymulter.none(), async (req: Request, res: Response) => {
  try {
    const reviewid = req.params.id;
    const datadeleted = await deleteReviews(reviewid);
    return res.status(200).send(datadeleted);
  } catch (err) {
    console.log("eror while deleting reviews");
    return res.status(500).send({ message: "error while updating reviews" });
  }
});

export default Rrouter;

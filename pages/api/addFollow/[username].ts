import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../../middleware/auth";
import { connectToDatabase } from "../../../middleware/database";
import { Follow } from "../../../middleware/models/Follow";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { username } = req.query;
  let db = await connectToDatabase();

  const apiUser = apiMustBeLoggedIn(req, res);

  if (!apiUser) return res.status(500).send("Please provide a valid token");

  let follow = new Follow(username, apiUser._id, db);
  follow
    .create()
    .then(() => {
      res.json(true);
    })
    .catch((errors) => {
      res.json(false);
    });
});
export default handler;

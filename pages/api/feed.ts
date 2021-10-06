import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../middleware/auth";
import { connectToDatabase } from "../../middleware/database";
import { PostClass } from "../../middleware/models/Post";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let db = await connectToDatabase();

  const apiUser = apiMustBeLoggedIn(req, res);

  const PC = new PostClass(db);
  const doc = await PC.getFeed(apiUser._id);
  res.json(doc);
});

export default handler;

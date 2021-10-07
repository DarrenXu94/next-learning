import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../middleware/auth";
import { connectToDatabase } from "../../middleware/database";
import { PostClass } from "../../middleware/models/Post";

const handler = nextConnect();

handler.delete(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { urls } = req.body;
  let db = await connectToDatabase();
  const apiUser = apiMustBeLoggedIn(req, res);
  const PC = new PostClass(db);
  try {
    const file = await PC.deleteImages(urls);

    res.json(file);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default handler;

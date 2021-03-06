import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../middleware/database";
import { PostClass } from "../../middleware/models/Post";

const handler = nextConnect();

handler.post(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let db = await connectToDatabase();

  const PC = new PostClass(db);
  const doc = await PC.search(req.body.searchTerm);
  res.json(doc);
});

export default handler;

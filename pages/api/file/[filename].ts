import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../../middleware/auth";
import { connectToDatabase } from "../../../middleware/database";
import { Post, PostClass } from "../../../middleware/models/Post";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { filename } = req.query;
  let db = await connectToDatabase();

  const PC = new PostClass(db);
  try {
    const file = await PC.getImage(filename);

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": file.length,
    });
    res.end(file);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default handler;

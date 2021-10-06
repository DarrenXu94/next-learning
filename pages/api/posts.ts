import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../middleware/auth";
import { connectToDatabase } from "../../middleware/database";
import { Post, PostClass } from "../../middleware/models/Post";

const handler = nextConnect();
handler.get(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let db = await connectToDatabase();

  const PC = new PostClass(db);
  const doc = await PC.getAllPosts();
  res.json(doc);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let db = await connectToDatabase();

  const apiUser = apiMustBeLoggedIn(req, res);
  let post = new Post(req.body, apiUser._id, null, db);
  post
    .create()
    .then(function (newId) {
      res.json(newId);
    })
    .catch(function (errors) {
      console.log(errors);
      res.status(500).json(errors);
    });
});

export default handler;

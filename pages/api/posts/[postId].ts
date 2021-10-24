import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../../middleware/auth";
import { connectToDatabase } from "../../../middleware/database";
import { Post, PostClass } from "../../../middleware/models/Post";

const handler = nextConnect();

export const getPostById = async (id) => {
  let db = await connectToDatabase();

  const PC = new PostClass(db);
  const doc = await PC.findSingleById(id, 0);
  return doc;
};

handler.get(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { postId } = req.query;

  try {
    const doc = await getPostById(postId);

    res.json(doc);
  } catch (error) {
    res.status(500).send(error);
  }
});

handler.post(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { postId } = req.query;

  let db = await connectToDatabase();

  const apiUser = apiMustBeLoggedIn(req, res);

  const PC = new PostClass(db);

  const doc = await PC.findSingleById(postId, apiUser._id);
  let post = new Post(req.body, apiUser._id, postId, db);
  post.update(doc).then((status) => {
    // the post was successfully updated in the database
    // or user did have permission, but there were validation errors
    if (status == "success") {
      res.json({ status: "success" });
    } else {
      res.status(500).send("failure");
    }
  });
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { postId } = req.query;

  let db = await connectToDatabase();

  const apiUser = apiMustBeLoggedIn(req, res);

  const PC = new PostClass(db);
  try {
    await PC.delete(postId, apiUser._id);
    res.send("Success");
  } catch (error) {
    res.status(500).send(error);
  }
});

export default handler;

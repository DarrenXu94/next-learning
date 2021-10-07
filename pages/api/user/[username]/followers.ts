import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../middleware/database";
import { FollowClass } from "../../../../middleware/models/Follow";
import { PostClass } from "../../../../middleware/models/Post";
import { UserClass } from "../../../../middleware/models/User";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { username } = req.query;
  let db = await connectToDatabase();

  const UC = new UserClass(db);
  const user: any = await UC.findByUsername(username);

  if (!user) return res.status(500).send("This user does not exist");
  const FC = new FollowClass(db);

  const docs = await FC.getFollowersById(user._id);
  res.json(docs);
});
export default handler;

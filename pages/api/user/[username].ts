import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../../middleware/auth";
import { connectToDatabase } from "../../../middleware/database";
import { UserClass } from "../../../middleware/models/User";
import { FollowClass } from "../../../middleware/models/Follow";
import { PostClass } from "../../../middleware/models/Post";

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { username } = req.query;
  let db = await connectToDatabase();

  const UC = new UserClass(db);
  const user: any = await UC.findByUsername(username);

  if (!user) return res.status(500).send("This user does not exist");

  // Check if header present
  const apiUser = apiMustBeLoggedIn(req, res);

  if (!apiUser) return res.status(500).send("Please provide a valid token");

  const FC = new FollowClass(db);

  const isFollowing = await FC.isVisitorFollowing(user._id, apiUser._id);

  const PC = new PostClass(db);
  const postCountPromise = PC.countPostsByAuthor(user._id);
  const followerCountPromise = FC.countFollowersById(user._id);
  const followingCountPromise = FC.countFollowingById(user._id);

  let [postCount, followerCount, followingCount] = await Promise.all([
    postCountPromise,
    followerCountPromise,
    followingCountPromise,
  ]);
  res.json({
    isFollowing,
    postCount,
    followerCount,
    followingCount,
    profileUsername: user.username,
    profileAvatar: user.avatar,
  });
});

export default handler;

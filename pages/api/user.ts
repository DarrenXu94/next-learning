import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../middleware/database";
import { User } from "../../middleware/models/User";
const jwt = require("jsonwebtoken");
const tokenLasts = "365d";

const handler = nextConnect();
handler.post(async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let db = await connectToDatabase();
  console.log(req.body);
  let user = new User(req.body, false, db);
  await user.register();
  res.json({
    token: jwt.sign(
      { _id: user.data._id, username: user.data.username, avatar: user.avatar },
      process.env.JWTSECRET,
      { expiresIn: tokenLasts }
    ),
    username: user.data.username,
    avatar: user.avatar,
  });
});

export default handler;

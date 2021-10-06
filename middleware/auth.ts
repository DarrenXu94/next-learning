import { NextApiRequest, NextApiResponse } from "next";

const jwt = require("jsonwebtoken");

export const apiMustBeLoggedIn = function (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
    return apiUser;
  } catch (e) {
    res.status(500).send("Sorry, you must provide a valid token.");
  }
};

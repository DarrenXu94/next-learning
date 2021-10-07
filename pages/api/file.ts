import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { apiMustBeLoggedIn } from "../../middleware/auth";
import { connectToDatabase } from "../../middleware/database";
import { Post, PostClass } from "../../middleware/models/Post";
import { uploadFilesMiddleware } from "../../middleware/upload";

const handler = nextConnect();

type NextApiRequestWithFormData = NextApiRequest & {
  file: any;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(
  async (req: NextApiRequestWithFormData, res: NextApiResponse<any>) => {
    const apiUser = apiMustBeLoggedIn(req, res);

    try {
      await uploadFilesMiddleware(req, res);
      if (req.file == undefined) {
        return res.send(`You must select a file.`);
      }

      const imgUrl = req.file.filename;
      return res.json(imgUrl);
    } catch (error) {
      console.log(error);
      res.send(`Error when trying upload image: ${error}`);
    }
  }
);

export default handler;

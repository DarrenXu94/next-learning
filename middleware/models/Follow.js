import { COLLECTIONS } from "../database";
const ObjectID = require("mongodb").ObjectID;
import { User } from "./User";

export class FollowClass {
  constructor(db) {
    this.db = db;
  }

  getFollowingById = async (id) => {
    try {
      let followers = await this.db
        .collection(COLLECTIONS.FOLLOWS)
        .aggregate([
          { $match: { authorId: id } },
          {
            $lookup: {
              from: "users",
              localField: "followedId",
              foreignField: "_id",
              as: "userDoc",
            },
          },
          {
            $project: {
              username: { $arrayElemAt: ["$userDoc.username", 0] },
              email: { $arrayElemAt: ["$userDoc.email", 0] },
            },
          },
        ])
        .toArray();
      followers = followers.map(function (follower) {
        let user = new User(follower, true);
        return { username: follower.username, avatar: user.avatar };
      });
      return followers;
    } catch (e) {
      return;
    }
  };

  getFollowersById = async (id) => {
    try {
      let followers = await this.db
        .collection(COLLECTIONS.FOLLOWS)
        .aggregate([
          { $match: { followedId: id } },
          {
            $lookup: {
              from: "users",
              localField: "authorId",
              foreignField: "_id",
              as: "userDoc",
            },
          },
          {
            $project: {
              username: { $arrayElemAt: ["$userDoc.username", 0] },
              email: { $arrayElemAt: ["$userDoc.email", 0] },
            },
          },
        ])
        .toArray();
      followers = followers.map(function (follower) {
        let user = new User(follower, true);
        return { username: follower.username, avatar: user.avatar };
      });
      return followers;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  countFollowersById = async (id) => {
    let followerCount = await this.db
      .collection(COLLECTIONS.FOLLOWS)
      .countDocuments({ followedId: id });
    return followerCount;
  };

  countFollowingById = async (id) => {
    let count = await this.db
      .collection(COLLECTIONS.FOLLOWS)
      .countDocuments({ authorId: id });
    return count;
  };

  isVisitorFollowing = async (followedId, visitorId) => {
    let followDoc = await this.db
      .collection(COLLECTIONS.FOLLOWS)
      .findOne({ followedId: followedId, authorId: new ObjectID(visitorId) });
    if (followDoc) {
      return true;
    } else {
      return false;
    }
  };
}

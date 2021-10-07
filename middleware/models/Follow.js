import { COLLECTIONS } from "../database";
const ObjectID = require("mongodb").ObjectID;

export class FollowClass {
  constructor(db) {
    this.db = db;
  }

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

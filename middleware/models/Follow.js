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

export const Follow = function (followedUsername, authorId, db) {
  this.followedUsername = followedUsername;
  this.authorId = authorId;
  this.errors = [];
  this.db = db;
};

Follow.prototype.cleanUp = async function () {
  if (typeof this.followedUsername != "string") {
    this.followedUsername = "";
  }
};

Follow.prototype.validate = async function (action) {
  // followedUsername must exist in database
  let followedAccount = await this.db
    .collection(COLLECTIONS.USERS)
    .findOne({ username: this.followedUsername });
  if (followedAccount) {
    this.followedId = followedAccount._id;
  } else {
    this.errors.push("You cannot follow a user that does not exist.");
  }

  let doesFollowAlreadyExist = await this.db
    .collection(COLLECTIONS.FOLLOWS)
    .findOne({
      followedId: this.followedId,
      authorId: new ObjectID(this.authorId),
    });
  if (action == "create") {
    if (doesFollowAlreadyExist) {
      this.errors.push("You are already following this user.");
    }
  }
  if (action == "delete") {
    if (!doesFollowAlreadyExist) {
      this.errors.push(
        "You cannot stop following someone you do not already follow."
      );
    }
  }

  // should not be able to follow yourself
  if (this.followedId.equals(this.authorId)) {
    this.errors.push("You cannot follow yourself.");
  }
};

Follow.prototype.create = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate("create");
    if (!this.errors.length) {
      await this.db.collection(COLLECTIONS.FOLLOWS).insertOne({
        followedId: this.followedId,
        authorId: new ObjectID(this.authorId),
      });
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

Follow.prototype.delete = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp();
    await this.validate("delete");
    if (!this.errors.length) {
      await this.db
        .collection(COLLECTIONS.FOLLOWS)
        .deleteOne({
          followedId: this.followedId,
          authorId: new ObjectID(this.authorId),
        });
      resolve();
    } else {
      reject(this.errors);
    }
  });
};

const ObjectID = require("mongodb").ObjectID;
import { COLLECTIONS } from "../database";
import { User } from "./User";
const sanitizeHTML = require("sanitize-html");

export class PostClass {
  constructor(db) {
    this.db = db;
  }

  deleteImages = async (urls) => {
    // const prefix = "http://localhost:8080/file/"
    // const urls = req.body.urls

    // const newUrls = urls.map(url => url.replace(prefix, ""))
    return new Promise(async (resolve, reject) => {
      const collection = this.db.collection(COLLECTIONS.FILES);
      const collectionChunks = this.db.collection(COLLECTIONS.CHUNKS);
      collection
        .find({ filename: { $in: urls } })
        .toArray(async function (err, docs) {
          if (err) {
            // return res.status(500).json({title: 'File error', message: 'Error finding file', error: err.errMsg});
            reject(err.errMsg);
          }
          if (!docs || docs.length === 0) {
            // return res.status(500).json({title: 'Download Error', message: 'No file found'});
            reject("No file found");
          } else {
            // Loop through results and delete
            for (let doc of docs) {
              const res = await collectionChunks.deleteOne({
                files_id: doc._id,
              });
            }
            await collection.deleteMany({ filename: { $in: urls } });
          }
          // res.json("Deleted")
          resolve("Deleted");
        });
    });
  };

  getImage = async (fileName) => {
    return new Promise(async (resolve, reject) => {
      const collection = this.db.collection(COLLECTIONS.FILES);
      const collectionChunks = this.db.collection(COLLECTIONS.CHUNKS);
      collection.find({ filename: fileName }).toArray(function (err, docs) {
        if (err) {
          reject(err.errMsg);
        }
        if (!docs || docs.length === 0) {
          reject("No file found");
        } else {
          //Retrieving the chunks from the db
          collectionChunks
            .find({ files_id: docs[0]._id })
            .sort({ n: 1 })
            .toArray(function (err, chunks) {
              if (err) {
                reject(err.errMsg);
              }
              if (!chunks || chunks.length === 0) {
                reject("No file found");
              }
              //Append Chunks
              let fileData = [];
              for (let i = 0; i < chunks.length; i++) {
                //This is in Binary JSON or BSON format, which is stored
                //in fileData array in base64 endocoded string format
                fileData.push(chunks[i].data.toString("base64"));
              }
              //Display the chunks using the data URI format
              // let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
              var img = Buffer.from(fileData[0], "base64");
              resolve(img);
            });
        }
      });
    });
  };

  findByAuthorId = async (authorId) => {
    return await this.reusablePostQuery([
      { $match: { author: authorId } },
      { $sort: { createdDate: -1 } },
    ]);
  };

  countPostsByAuthor = async (id) => {
    let postCount = await this.db
      .collection(COLLECTIONS.POSTS)
      .countDocuments({ author: id });
    return postCount;
  };

  getAllPosts = async () => {
    return this.reusablePostQuery([
      { $match: {} },
      { $sort: { createdDate: -1 } },
    ]);
  };

  findSingleById = async (id, visitorId) => {
    if (typeof id != "string" || !ObjectID.isValid(id)) {
      throw "Incorrect id format";
    }

    let posts = await this.reusablePostQuery(
      [{ $match: { _id: new ObjectID(id) } }],
      visitorId,
      []
    );

    if (posts.length) {
      return posts[0];
    } else {
      throw "No results";
    }
  };

  getFeed = async (id) => {
    let followedUsers = await this.db
      .collection(COLLECTIONS.FOLLOWS)
      .find({ authorId: new ObjectID(id) })
      .toArray();
    followedUsers = followedUsers.map(function (followDoc) {
      return followDoc.followedId;
    });
    followedUsers.push(new ObjectID(id));

    // look for posts where the author is in the above array of followed users
    return this.reusablePostQuery([
      { $match: { author: { $in: followedUsers } } },
      { $sort: { createdDate: -1 } },
    ]);
  };

  search = async (searchTerm) => {
    if (typeof searchTerm == "string") {
      let posts = await this.reusablePostQuery(
        [{ $match: { $text: { $search: searchTerm } } }],
        undefined,
        [{ $sort: { score: { $meta: "textScore" } } }]
      );
      return posts;
    } else {
      return "Incorrect format";
    }
  };

  reusablePostQuery = async (
    uniqueOperations,
    visitorId,
    finalOperations = []
  ) => {
    let aggOperations = uniqueOperations
      .concat([
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "authorDocument",
          },
        },
        {
          $project: {
            title: 1,
            body: 1,
            createdDate: 1,
            authorId: "$author",
            author: { $arrayElemAt: ["$authorDocument", 0] },
          },
        },
      ])
      .concat(finalOperations);

    let posts = await this.db
      .collection(COLLECTIONS.POSTS)
      .aggregate(aggOperations)
      .toArray();

    // clean up author property in each post object
    posts = posts.map(function (post) {
      post.isVisitorOwner = post.authorId.equals(visitorId);
      post.authorId = undefined;

      post.author = {
        username: post.author.username,
        avatar: new User(post.author, true).avatar,
      };

      return post;
    });

    return posts;
  };

  delete = async (postIdToDelete, currentUserId) => {
    let post = await this.findSingleById(postIdToDelete, currentUserId);
    if (post.isVisitorOwner) {
      await this.db.collection(COLLECTIONS.POSTS).deleteOne({
        _id: new ObjectID(postIdToDelete),
      });
      return;
    } else {
      throw "You do not have permission to delete this";
    }
  };
}

export const Post = function (data, userid, requestedPostId, db) {
  this.data = data;
  this.errors = [];
  this.userid = userid;
  this.requestedPostId = requestedPostId;
  this.db = db;
};

Post.prototype.create = async function () {
  this.cleanUp();
  this.validate();
  if (!this.errors.length) {
    // save post into database
    const info = await this.db
      .collection(COLLECTIONS.POSTS)
      .insertOne(this.data);
    return info;
  } else {
    return this.errors;
  }
};

Post.prototype.update = function (doc) {
  return new Promise(async (resolve, reject) => {
    try {
      // let post = await Post.findSingleById(this.requestedPostId, this.userid);
      if (doc.isVisitorOwner) {
        // actually update the db
        let status = await this.actuallyUpdate();
        resolve(status);
      } else {
        reject();
      }
    } catch (e) {
      console.log(e);
      reject();
    }
  });
};

Post.prototype.actuallyUpdate = async function () {
  this.cleanUp();
  this.validate();
  if (!this.errors.length) {
    await this.db
      .collection(COLLECTIONS.POSTS)
      .findOneAndUpdate(
        { _id: new ObjectID(this.requestedPostId) },
        { $set: { title: this.data.title, body: this.data.body } }
      );
    return "success";
  } else {
    console.log(this.errors);
    throw "failure";
  }
};

Post.prototype.validate = function () {
  if (this.data.title == "") {
    this.errors.push("You must provide a title.");
  }
  if (this.data.body == "") {
    this.errors.push("You must provide post content.");
  }
};

Post.prototype.cleanUp = function () {
  if (typeof this.data.title != "string") {
    this.data.title = "";
  }
  if (typeof this.data.body != "string") {
    this.data.body = "";
  }

  // get rid of any bogus properties
  this.data = {
    title: sanitizeHTML(this.data.title.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),

    body: sanitizeHTML(this.data.body.trim(), {
      allowedTags: [
        "address",
        "article",
        "aside",
        "footer",
        "header",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hgroup",
        "main",
        "nav",
        "section",
        "blockquote",
        "dd",
        "div",
        "dl",
        "dt",
        "figcaption",
        "figure",
        "hr",
        "li",
        "main",
        "ol",
        "p",
        "pre",
        "ul",
        "a",
        "abbr",
        "b",
        "bdi",
        "bdo",
        "br",
        "cite",
        "code",
        "data",
        "dfn",
        "em",
        "i",
        "kbd",
        "mark",
        "q",
        "rb",
        "rp",
        "rt",
        "rtc",
        "ruby",
        "s",
        "samp",
        "small",
        "span",
        "strong",
        "sub",
        "sup",
        "time",
        "u",
        "var",
        "wbr",
        "caption",
        "col",
        "colgroup",
        "table",
        "tbody",
        "td",
        "tfoot",
        "th",
        "thead",
        "tr",
        "img",
      ],
      allowedAttributes: { img: ["src"] },
    }),
    createdDate: new Date(),
    author: ObjectID(this.userid),
  };
};

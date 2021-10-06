let User = function (data, getAvatar) {
  this.data = data;
  this.errors = [];
  if (getAvatar == undefined) {
    getAvatar = false;
  }
  if (getAvatar) {
    this.getAvatar();
  }
};

User.prototype.getAvatar = function () {
  this.avatar = `https://avatars.dicebear.com/api/miniavs/${this.data.email}.svg`;
};

module.exports = User;

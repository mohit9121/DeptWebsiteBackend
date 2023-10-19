const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
  },
  
});

const AchievementDetail = mongoose.model('AchievementDetail', AchievementSchema);

module.exports = AchievementDetail;

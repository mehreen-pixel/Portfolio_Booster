const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  template: { type: String, default: 'clean' },
  about: { type: String, default: '' },
  contact: {
    email: String,
    phone: String,
    website: String,
    location: String
  },
  education: [
    {
      institute: String,
      degree: String,
      start: String,
      end: String,
      description: String
    }
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      link: String
    }
  ],
  socials: {
    github: String,
    linkedin: String,
    twitter: String
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
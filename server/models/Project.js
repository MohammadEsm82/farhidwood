const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    style: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    year: {
      type: String,
      default: "",
    },

    area: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "همه",
    },

    materials: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    layout: {
      type: String,
      default: "small",
    },

    // عکس اصلی پروژه
    hero: {
      type: String,
      default: "",
    },

    // عکس‌های گالری
    images: {
      type: [String],
      default: [],
    },

    // ویدئوی پروژه
    video: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
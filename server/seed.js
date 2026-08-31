const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Project = require("./models/Project");

dotenv.config();

const projects = [
  {
    id: 1,
    slug: "modern-kitchen",
    title: "آشپزخانه مدرن",
    style: "Modern",
    city: "اصفهان",
    year: "1405",
    area: "180 متر مربع",
    duration: "45 روز",
    category: "کابینت",

    hero:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1800&auto=format&fit=crop&q=80",

    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1800",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1800",
    ],

    materials: [
      "MDF",
      "High Gloss",
      "Polyurethane",
    ],

    description:
      "این پروژه با هدف ایجاد فضایی مدرن و مینیمال اجرا شده است.",

    layout: "large",
  },

  {
    id: 2,
    slug: "closet-room",
    title: "کلوزت روم",
    style: "Luxury",
    city: "تهران",
    year: "1404",
    area: "120 متر مربع",
    duration: "30 روز",
    category: "کلوزت",

    hero:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800&auto=format&fit=crop&q=80",

    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1800",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1800",
    ],

    materials: [
      "MDF",
      "Glass",
      "LED",
    ],

    description:
      "کلوزت روم لوکس با نورپردازی مخفی و متریال وارداتی.",

    layout: "small",
  },

  {
    id: 3,
    slug: "villa",
    title: "ویلای مدرن",
    style: "Modern",
    city: "شمال",
    year: "1405",
    area: "320 متر مربع",
    duration: "90 روز",
    category: "همه",

    hero:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800",

    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800",
    ],

    materials: [
      "Wood",
      "Stone",
    ],

    description:
      "طراحی کامل ویلای مدرن.",

    layout: "wide",
  },
];

const seedProjects = async () => {
  try {
    await connectDB();

    await Project.deleteMany();

    await Project.insertMany(projects);

    console.log("✅ Projects imported successfully!");
    console.log(`📦 ${projects.length} projects added to MongoDB`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Error importing projects:");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedProjects();
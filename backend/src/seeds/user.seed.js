import { connectDB } from "../lib/db.js";
import "dotenv/config";
import User from "../models/user.model.js";

const seedUsers = [
  {
    email: "emma.wilson@example.com",
    fullName: "Emma Wilson",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.brown@example.com",
    fullName: "Olivia Brown",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "ava.miller@example.com",
    fullName: "Ava Miller",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.moore@example.com",
    fullName: "Isabella Moore",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.taylor@example.com",
    fullName: "Mia Taylor",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.anderson@example.com",
    fullName: "Charlotte Anderson",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.thomas@example.com",
    fullName: "Amelia Thomas",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    email: "harper.jackson@example.com",
    fullName: "Harper Jackson",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    email: "evelyn.white@example.com",
    fullName: "Evelyn White",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    email: "liam.johnson@example.com",
    fullName: "Liam Johnson",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "noah.smith@example.com",
    fullName: "Noah Smith",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "oliver.williams@example.com",
    fullName: "Oliver Williams",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "elijah.jones@example.com",
    fullName: "Elijah Jones",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "james.garcia@example.com",
    fullName: "James Garcia",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "william.martinez@example.com",
    fullName: "William Martinez",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "benjamin.rodriguez@example.com",
    fullName: "Benjamin Rodriguez",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    email: "lucas.hernandez@example.com",
    fullName: "Lucas Hernandez",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    email: "henry.lopez@example.com",
    fullName: "Henry Lopez",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    email: "alexander.gonzalez@example.com",
    fullName: "Alexander Gonzalez",
    password: "abcdefg",
    profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();

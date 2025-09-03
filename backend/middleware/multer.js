import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure folders exist
const pdfDir = "uploads/bookPDFS/";
const imgDir = "uploads/bookImages/";

if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, pdfDir);
    else if (file.mimetype.startsWith("image/")) cb(null, imgDir);
    else cb(new Error("Invalid file type"), false);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf" || file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs and images are allowed!"), false);
  }
};

// Export Multer middleware
export const uploadFiles = multer({ storage, fileFilter });

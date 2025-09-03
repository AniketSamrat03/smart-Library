import { createBookTextData } from "../repositories/ExtractedBookRepository.js";
import cloudinary from "../config/cloudinary.js";
import { doesBookExistwithBookId } from "../repositories/BookRepository.js";
import createError from "http-errors";
import axios from "axios";


export const createBookExtractedText = async (BookId) => {
  // 1. Check if book exists
  const book = await doesBookExistwithBookId(BookId);
  if (!book) throw createError.NotFound("Book doesn't exist");

  // 2. Get PDF URL from Cloudinary
  const public_id = book.bookFileUrl;
  const fileUrl = cloudinary.url(public_id, {
    resource_type: "raw",
    type: "authenticated",
    sign_url: true,
    flags: "attachment",
  });

  // 3. Fetch PDF as arraybuffer
  const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
  const pdfBuffer = new Uint8Array(response.data);

 

  // 5. Save extracted text
  const savedText = await createBookTextData(BookId, extractedText);
  return savedText;
};



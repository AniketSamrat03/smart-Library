import Books from "../models/Book.js";
import mongoose from "mongoose";

// to create books
export async function createBook(bookFileUrl, bookImagesUrl, bookName, author) {
 const normalizedBookName = bookName.replace(/\s+/g, ' ').trim().toLowerCase();

const newBook = new Books({
  bookName,
  normalizedBookName,
  author,
  bookFileUrl,
  bookImagesUrl,
});
await newBook.save();
  return await newBook.save();
}



// to read book
export async function getBook(id){
    const objectId = new mongoose.Types.ObjectId(id);

  return await Books.findByIdAndUpdate({ _id: objectId });

}


// to update book data
export async function updateBook(id,updateData){
    return await Books.findByIdAndUpdate(id,updateData,{new:true})
}

//to delete books

export const deleteBook = async (id) => {
  const objectId = new mongoose.Types.ObjectId(id);
console.log("OBJECT ID",objectId)
 
  return await Books.findByIdAndDelete({ _id: objectId }); // make sure id is a valid _id
};

// to get all books
export async function getAllBooks(){
    return await Books.find();
}
export async function doesBookExist(bookName){
  // normalize: trim and lowercase
 const normalizedName = bookName.replace(/\s+/g, ' ').trim().toLowerCase();
  return await Books.findOne({ normalizedBookName: normalizedName });
}

export async function doesBookExistwithBookId(BookId) {
    
  // Convert to ObjectId if it's a string
  const objectId = new mongoose.Types.ObjectId(BookId);

  return await Books.findOne({ _id: objectId });
}






import { createBook,deleteBook,doesBookExist,doesBookExistwithBookId,getAllBooks, getBook, updateBook} from "../repositories/BookRepository.js";
import cloudinary from "../config/cloudinary.js";
import  createError from"http-errors"
import fs from 'fs'
export const uploadBookService = async(BookfilePath,imageFilePath,bookName,author) =>{
    
  const checkBook = await doesBookExist(bookName);
   console.log("Already Book Exists data",checkBook)
  if(checkBook){
    throw createError.Conflict("Book already exists")
  }


   const BookUploadresult =await cloudinary.uploader.upload(BookfilePath,{
      folder: 'BookFiles', 
     unique_filename: false,
     type:'authenticated',
     resource_type:"raw"
    }
    )
    if(!BookUploadresult){
  throw createError.InternalServerError("Book Not able to upload")
    }
    const BookImgUploadResult = await cloudinary.uploader.upload(imageFilePath,{
      folder: 'BookImages', 
     unique_filename: false,
     
type:'authenticated',
     resource_type:"image"
    }
    )
     if(!BookImgUploadResult){
  throw createError.InternalServerError("Book Not able to upload")
    }
    const BookFileUrl = BookUploadresult.public_id;
    const BookImagesUrl = BookImgUploadResult.public_id;
    console.log("BookFIleUrl",BookFileUrl)
    console.log("BookImageUrl",BookImagesUrl)
  const newBook = await createBook(BookFileUrl,BookImagesUrl,bookName,author);
  if(!newBook){
   throw createError.InternalServerError("Book Not Able to Save")
  }
  try {
    fs.unlinkSync(BookfilePath);
    if (imageFilePath) fs.unlinkSync(imageFilePath);
  } catch (err) {
    console.warn("Failed to delete local files:", err.message);
  }

  return newBook;

}



export const getAllBooksService = async () => {
  const allBooksData = await getAllBooks();

  // Map over each book and convert public_id to URLs
  const booksWithUrls = allBooksData.map((book) => {
    // Generate Cloudinary URL for book image (displayable)
    const imageUrl = cloudinary.url(book.bookImagesUrl, {
      width: 300,       // thumbnail width
      height: 400,      // thumbnail height
      crop: "fill",     // crop mode
      format: "jpg",    // optional format
      secure: true,
      sign_url: true,   // required for authenticated images
      resource_type:'image',
      type:'authenticated'
    });

    // Generate signed Cloudinary URL for PDF (viewable in-browser)
    const bookFileUrl = cloudinary.url(book.bookFileUrl, {
      resource_type: "raw",
      type: "authenticated",
      secure: true,
      sign_url: true,
    });

    return {
      ...book.toObject(), // convert Mongoose doc to plain object
      bookImagesUrl: imageUrl,
      bookFileUrl: bookFileUrl,
    };
  });

  return {
 
  booksWithUrls
  };
};



export  const updateBookService = async(id,updateData)=>{
const Book = await doesBookExistwithBookId(id)
if(!Book){
  throw createError.NotFound('Book Does Not Exist')
}

const updatedBook = await updateBook(id,updateData)
if(!updatedBook)
{
  throw createError.InternalServerError('Something Went Wrong While Updating Book')
}
console.log(updatedBook)
return updatedBook

}



export  const deleteBookService = async(id)=>{
const Book = await doesBookExistwithBookId(id)

if(!Book){
  throw createError.NotFound('Book Does Not Exist')
}

const deletedBook = await deleteBook(id)
if(!deletedBook)
{
  throw createError.InternalServerError('Something Went Wrong While deleting Book')
}

return true

}


export const getBookService = async (id) => {
  const BookData = await getBook(id);

  // Map over each book and convert public_id to URLs
 
    // Generate Cloudinary URL for book image (displayable)
    const imageUrl = cloudinary.url(BookData.bookImagesUrl, {
      width: 300,       // thumbnail width
      height: 400,      // thumbnail height
      crop: "fill",     // crop mode
      format: "jpg",    // optional format
      secure: true,
      sign_url: true,   // required for authenticated images
      resource_type:'image',
      type:'authenticated'
    });

    // Generate signed Cloudinary URL for PDF (viewable in-browser)
    const bookFileUrl = cloudinary.url(BookData.bookFileUrl, {
      resource_type: "raw",
      type: "authenticated",
      secure: true,
      sign_url: true,
    });

    
  

  return {
 ...BookData.toObject(),
 bookFileUrl:bookFileUrl
 ,
 bookImagesUrl:imageUrl
 
  };
};





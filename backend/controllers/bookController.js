import {uploadBookService,getAllBooksService,updateBookService, deleteBookService, getBookService}  from '../services/bookService.js'

export const uploadBook = async (req, res) => {
   
  try {
const BookfilePath = req.files.bookFile?.[0]?.path;

  
     if (!BookfilePath) {
      return res.status(400).json({ success: false, message: 'No Book File uploaded' });
    }
 const imageFilePath = req.files.imageFile?.[0]?.path || null;

    const bookName=req.body.bookName;
    const author = req.body.author;

    const didBookUploaded = await uploadBookService(BookfilePath,imageFilePath,bookName,author)
      res.status(200).json({message :' Book Uploaded SuccessFully',didBookUploaded});
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};


export const getAllBooks = async (req,res)=>{
  try{
    const AllBooksAvailable = await getAllBooksService();

    res.status(201).json({message:"All Books fetched Successfully",AllBooksAvailable})

  }catch(error){
    res.status(500).json({ message: "Something Went Wrong", error: error.message });
  }
}


export const updateBook = async (req, res) => {
  try {
    const id = req.params.id;  // Extract id from URL
    const updateData = req.body; // Data to update
    
   
    const UpdatedBook = await updateBookService(id, updateData);

    res.status(200).json({
      message: "Book Updated Successfully",
      UpdatedBook
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;  // Extract id from URL
    // Data to update
    console.log("ID WHILE Deleting Book",id)

    const deleteBook = await deleteBookService(id)

    res.status(200).json({
      message: "Book Deleted Successfully",
      deleteBook
    });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong", error: error.message });
  }
};

export const getBook = async (req,res)=>{
  try{
    const id = req.params.id
    const fetchedBook = await getBookService(id)
     console.log(fetchedBook)
    res.status(201).json({message:" Book fetched Successfully",fetchedBook})

  }catch(error){
    res.status(500).json({ message: "Something Went Wrong", error: error.message });
  }
}
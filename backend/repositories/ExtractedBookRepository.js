import ExtractedTextFromBook from "../models/ExtractedTextModel.js";

export async function createBookTextData(  BookId, extractedText){
   const newTextData = new ExtractedTextFromBook({
    BookId,
    extractedText
   })

   return newTextData.save()
}

export async function getTextDatas(filter ={}){
return await ExtractedTextFromBook.find(filter);
}

export async function updateBookExtractedText(BookId,updateData){
    return await ExtractedTextFromBook.findByIdAndUpdate(BookId,updateData,{new:true})
}


export async function deleteExtractedBookText(BookId){
    return await ExtractedTextFromBook.findOneAndDelete(BookId)
}



export async function getAllBooksExtractedTextData(){
    return await ExtractedTextFromBook.find();
}

export async function doesThisBookTextAvailable(BookId){
 

  return await Books.findOne({
    BookId: { BookId }
  });
}





import { createBookExtractedText } from "../services/extractedTextDataService.js";



export const  createExtractedText = async(req,res)=>{

    try{
  const BookId = req.body.BookId;
  console.log(BookId)

  const result = await createBookExtractedText(BookId)
  if(result){
    res.status(200).json({sucess:true,message:"Text Extracted Succesffuly"})
  }
    }catch(error){
        res.status(500).json({success:false,message:"Somethiing went Wrong"},error.message)
        console.log(error.message)
    }

}
import mongoose from 'mongoose'


const BookSchema =  new mongoose.Schema({
   bookName:{
    type:String,
    required:true

   },
   author:{
    type:String,
    required:true
   },
   bookFileUrl:{
    type:String,
    required:true
   },
   bookImagesUrl:{
    type:String,
    default:"Book"
   },
   
},{timestamps:true}
)


const Books = mongoose.model('books',BookSchema)
export default Books
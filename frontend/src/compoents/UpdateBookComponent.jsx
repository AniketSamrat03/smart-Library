import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Container from "./container/container.jsx";
import { Input } from "./index.js";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function UpdateBookComponent() {
    const {id} =useParams()
 
    
    const [bookName,setBookName] = useState('')
    const [author,setAuthor] = useState('')
    const [imagePreview,setImagePreview] = useState(null)
    const [imageFile,setImageFile] = useState(null)
    const [bookPDFFile,setBookPDFFile] = useState(null)
    const imageInputRef = useRef(null);
    var orginalBookdata = {}
    async function fetchBook(){
        try{
const  response = await axios.get(`${BASE_URL}/get-book/${id}`)
 const fetchedbookData = response.data.fetchedBook;
 orginalBookdata =fetchedbookData;
 console.log(orginalBookdata)
   setBookName(fetchedbookData.bookName)
   setAuthor(fetchedbookData.author)
   setImagePreview(fetchedbookData.bookImagesUrl)
    setBookPDFFile(fetchedbookData. bookFileUrl? {name:"Book",url:fetchedbookData.bookFileUrl}:null)
        }catch(error){

        }
    }
  useEffect(()=>{
    fetchBook()
    
    
  },[id])
  //this function runs when user clicks and selects image file
  const handleImageFileChange = (e)=>{
const file = e.target.files[0]
if(file && file.type.startsWith("image")){
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
}
  }
    const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setBookPDFFile(file);
    }
  };

  return (
    <Container className="flex flex-col gap-8 m-7 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
     <form >
             {/* Top Section */}
             <div className="flex justify-between gap-8">
               {/* Left Side */}
               <div className="flex flex-col gap-4 w-1/2">
                 <Input
                   placeholder="Book Name"
                   value={bookName}
                   onChange={(e) => setBookName(e.target.value)}
                  
                   className="border-gray-300 shadow-sm"
                 />
                 <Input
                   placeholder="Author Name"
                     value={author}
                   onChange={(e) => setBookName(e.target.value)}
                
                   className="border-gray-300 shadow-sm"
                 />
               </div>
     
               {/* Right Side */}
               <div className="flex flex-col gap-4 w-1/2">
                 {/* Image Picker Card */}
                 <label className="p-4 border-2 border-dashed rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 bg-gray-50 cursor-pointer transition-all duration-300 text-center">{imagePreview? <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-md" />: ( <span className="text-gray-600 text-sm">Click to Upload Book Image</span> )} 
                 <input type="file" accept="image/*" onChange={handleImageFileChange} ref={imageInputRef} className="hidden" /> </label>
     
                 {/* PDF Picker */}
                 <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
                   <Input
                     type="file"
                     accept="application/pdf"
                     onChange={handlePdfChange}
                     className="border-gray-300 shadow-sm"
                   />
                  {bookPDFFile && (
                     <div className="mt-3 flex justify-between items-center bg-white rounded-md p-2 border shadow-sm">
                       <span className="text-sm text-gray-700 truncate">
                         {bookPDFFile.name || "PDF file"}
                       </span>
                       <a
                         href={bookPDFFile.url || URL.createObjectURL(bookPDFFile)}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="px-3 py-1 bg-[#67C090] text-white rounded-md hover:bg-[#124170] text-xs transition-colors"
                       >
                         Open PDF
                       </a>
                     </div>
                   )}
                 </div>
               </div>
             </div>
     
             {/* Bottom Section */}
             <div className="flex justify-center mt-6">
               <button
                 type="submit"
                 disabled={status === "loading"}
                 className="px-6 py-2 bg-[#67C090] text-white rounded-lg shadow hover:bg-[#124170] transition-colors duration-300 disabled:opacity-50"
               >
                 {status === "loading" ? "Uploading..." : "Update"}
               </button>
             </div>
     
             <p className="text-red-500 mt-2 text-center"></p>
           </form>
    </Container>
  );
}

export default UpdateBookComponent; 

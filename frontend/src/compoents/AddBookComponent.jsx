import React,{useRef} from "react";
import { Input } from "./index.js";
import Container from "./container/container.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setBookName,
  setAuthorName,
  setImage,
  setPDF,
  submitBookForm,
  resetForm,
} from "../store/bookFormSlice.js";

function AddBookComponent() {
  const dispatch = useDispatch();
  const { bookName, authorName, imagePreview, pdfFile, status, error } =
    useSelector((state) => state.bookForm);
 const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      dispatch(setImage({ file, preview: URL.createObjectURL(file) }));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      dispatch(setPDF(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitBookForm())
      .unwrap()
      .then(() => {
        alert("Book uploaded successfully!");
        dispatch(resetForm());
           if (imageInputRef.current) imageInputRef.current.value = null;
        if (pdfInputRef.current) pdfInputRef.current.value = null;
      })
      .catch((err) => {
        alert("Error uploading book: " + err);
      });
  };

  return (
    <Container className="flex flex-col gap-8 m-7 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit}>
        {/* Top Section */}
        <div className="flex justify-between gap-8">
          {/* Left Side */}
          <div className="flex flex-col gap-4 w-1/2">
            <Input
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => dispatch(setBookName(e.target.value))}
              className="border-gray-300 shadow-sm"
            />
            <Input
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => dispatch(setAuthorName(e.target.value))}
              className="border-gray-300 shadow-sm"
            />
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-4 w-1/2">
            {/* Image Picker Card */}
            <label className="p-4 border-2 border-dashed rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 bg-gray-50 cursor-pointer transition-all duration-300 text-center"> {imagePreview ? ( <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-md" /> ) : ( <span className="text-gray-600 text-sm">Click to Upload Book Image</span> )} 
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" /> </label>

            {/* PDF Picker */}
            <div className="bg-gray-50 border rounded-xl p-4 shadow-sm">
              <Input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="border-gray-300 shadow-sm"
              />
              {pdfFile && (
                <div className="mt-3 flex justify-between items-center bg-white rounded-md p-2 border shadow-sm">
                  <span className="text-sm text-gray-700 truncate">
                    {pdfFile.name}
                  </span>
                  <a
                    href={URL.createObjectURL(pdfFile)}
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
            {status === "loading" ? "Uploading..." : "Submit"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </form>
    </Container>
  );
}

export default AddBookComponent;



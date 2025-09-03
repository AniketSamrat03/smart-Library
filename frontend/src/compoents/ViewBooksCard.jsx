// ViewBooksCard.jsx
import React, { useState } from 'react';
import Container from './container/container';
import ImageCard from './ImageCard';
import { HiOutlineDotsVertical } from 'react-icons/hi';

function ViewBooksCard({ books, onReadBook, onUpdateBook, onDeleteBook }) {
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = (bookId) => {
    setMenuOpen(menuOpen === bookId ? null : bookId);
    console.log("FROM MENU",bookId)
  };

  return (
    <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="relative flex flex-col bg-white rounded-xl shadow p-2 hover:shadow-lg transition"
        >
          {/* 3-dot menu */}
          <div className="absolute top-2 right-2">
            <button
              onClick={() => toggleMenu(book.id)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <HiOutlineDotsVertical size={20} />
            </button>

            {menuOpen === book.id && (
              <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-md z-10">
                <button
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => onUpdateBook(book)}
                >
                  Update
                </button>
             <button
  className={`mt-2 w-full text-sm py-1 rounded transition-colors ${
    book.deleting ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#67C090] text-white hover:bg-[#124170]'
  }`}
  onClick={() => !book.deleting && onDeleteBook(book.id)}
  disabled={book.deleting}
>
  {book.deleting ? 'Deleting...' : 'Delete Book'}
</button>

              </div>
            )}
          </div>

          {/* Book Image */}
          <ImageCard id={book.id} image={book.image} />

          {/* Book Info */}
          <div className="mt-2 flex flex-col items-start">
            <h2 className="text-sm font-semibold text-gray-800 truncate">
              {book.name}
            </h2>
            <p className="text-xs text-gray-500 truncate">{book.author}</p>
          </div>

          {/* Read Book Button */}
          <button
            className="mt-2 w-full bg-[#67C090] text-white text-sm py-1 rounded hover:bg-[#124170] transition-colors"
            onClick={() => onReadBook(book.bookFileUrl)}
          >
            Read Book
          </button>
        </div>
      ))}
    </Container>
  );
}

export default ViewBooksCard;


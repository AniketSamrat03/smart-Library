import React from 'react';
import Container from './container/container';
import ImageCard from './ImageCard';

function HomeCard({ books ,onReadBook}) {
  return (
    <Container className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex flex-col bg-white rounded-xl shadow p-2 hover:shadow-lg transition"
        >
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

export default HomeCard;

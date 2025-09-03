// ViewBooksComponent.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ViewBooksCard from './ViewBooksCard';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
function ViewBooksComponent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [deletingBookId, setDeletingBookId] = useState(null); // track which book is being deleted
  const navigate = useNavigate()
  // Open book in new tab
  const openBook = (bookFileUrl) => {
    if (!bookFileUrl) return;
    window.open(bookFileUrl, '_blank');
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      // show loader on the deleting book
      console.log("by clicking delete button",id)
      const response = await axios.delete(`${BASE_URL}/delete-book/${id}`)
      if(response.status ===200){
        fetchBooks()
      }
    } catch (err) {
      console.error('Error deleting book:', err);
    } finally {
      setDeletingBookId(null); // remove loader
    }
  };

  // Update book placeholder function
  const updateBook = (book) => {
 
   navigate(`/update-book/${book.id}`)
    // Implement update functionality if needed
  };

  // Fetch books, optionally reset the list
  const fetchBooks = async (reset = false) => {
    try {
      if (reset) setLoading(true); // show main loader if resetting
      const res = await axios.get(`${BASE_URL}/all-books`);
      const booksArray = res.data?.AllBooksAvailable.booksWithUrls || [];

      if (booksArray.length === 0) {
        setHasMore(false);
        return;
      }

      setBooks(reset ? booksArray : [...booksArray]);
    } catch (err) {
      console.error('Error fetching books:', err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <h1 className="text-center mt-10 text-xl">Loading...</h1>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center m-5 text-[#240170]">
        AVAILABLE BOOKS
      </h1>

      <InfiniteScroll
        dataLength={books.length}
        next={() => fetchBooks()}
        hasMore={hasMore}
        loader={<h4 className="text-center mt-4">Loading...</h4>}
        endMessage={
          <p className="text-center mt-4 text-[#240170]">
            <b>No more books to display</b>
          </p>
        }
      >
        <ViewBooksCard
          books={books.map((book) => ({
            id: book._id,
            image: book.bookImagesUrl,
            name: book.bookName,
            author: book.author,
            bookFileUrl: book.bookFileUrl,
            deleting: deletingBookId === book._id, // pass deleting state to card
          }))}
          onReadBook={openBook}
           onDeleteBook={(id) => deleteBook(id)}
          onUpdateBook={updateBook}
          
        />
      </InfiniteScroll>
    </div>
  );
}

export default ViewBooksComponent;

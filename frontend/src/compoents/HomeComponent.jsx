import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import HomeCard from './HomeCard';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
function HomeComponent() {
 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
    const openBook = (bookFileUrl) => {
    if (!bookFileUrl) return;
    window.open(bookFileUrl, '_blank');
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/all-books`);
      const booksArray = res.data?.AllBooksAvailable.booksWithUrls || [];
      
      if (booksArray.length === 0) {
        setHasMore(false);
        return;
      }
       if (booksArray.length <= books.length) {
        setHasMore(false);
        return;
      }
      setBooks((prev) => [...prev, ...booksArray]);
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

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className='flex flex-col items-center '>
         <h1 className='text-2xl font-bold text-center m-5 text-[#240170]'>
        AVAILABLE BOOKS
      </h1>

    
    <InfiniteScroll
      dataLength={books.length}
      next={fetchBooks}
      hasMore={hasMore}
      loader={<h4 className="text-center mt-4">Loading...</h4>}
      endMessage={
        <p className="text-center mt-4 text-[#240170]">
          <b>No more books to display</b>
        </p>
      }
    >
      <HomeCard
        books={books.map((book) => ({
          id: book._id,
          image: book.bookImagesUrl,
          name: book.bookName,
          author: book.author,
          bookFileUrl: book.bookFileUrl
        }))}
        onReadBook={openBook}
      />
    </InfiniteScroll>
    </div>
  );
}

export default HomeComponent;

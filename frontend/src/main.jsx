
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MyBooks from './pages/myBooks.jsx'
import Summaries from './pages/Summaries.jsx'
import Quizzes from './pages/Quizzes.jsx'
import Home from './pages/Home.jsx'
import {Provider} from 'react-redux'
import ViewsBooks from './pages/ViewBooks.jsx'
import Dashboard from './pages/DashBoard.jsx'
import AddBook from './pages/AddBook.jsx'
import BookQuiz from './pages/BookQuizes.jsx'
import { AuthProvider } from '@descope/react-sdk'
import Signup from './pages/Signup.jsx'
import confg from './confg/confg.js'
import { store } from './store/store.js'
import UpdateBook from './pages/UpdateBook.jsx'


const router = createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
     {
        path:"/",
        element:<Home/>
      },
        {
        path:"/my-books",
        element:<MyBooks/>
      },
        {
        path:"/summaries",
        element:<Summaries/>
      },
        {
        path:"/quizzes",
        element:<Quizzes/>
      },
      {
        path:"/view-books",
        element:<ViewsBooks/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/add-book",
        element:<AddBook/>
      },
      {
        path:"/book-quiz",
        element:<BookQuiz/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/update-book/:id",
        element:<UpdateBook/>
      }

  ]
}])

createRoot(document.getElementById('root')).render(
 
    <AuthProvider projectId={confg.projectId}>
      <Provider store={store}>
    
     <RouterProvider router={router }/>
     </Provider>
    </AuthProvider>
  
)

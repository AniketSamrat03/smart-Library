import { HomeIcon, BookOpenIcon, DocumentTextIcon,AcademicCapIcon } from '@heroicons/react/24/outline';

export const UserSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon className="w-5 h-5 mr-2" />,
  },
  {
    title: 'My Books',
    path: '/my-books',
    icon: <BookOpenIcon className="w-5 h-5 mr-2" />,
  },
  {
    title: 'Summaries',
    path: '/summaries',
    icon: <DocumentTextIcon className="w-5 h-5 mr-2" />,
  },
  {
    title: 'Quizzes',
    path: '/quizzes',
    icon: <AcademicCapIcon className="w-5 h-5 mr-2" />,
  },
];


export const AdminSidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <HomeIcon className="w-5 h-5 mr-2" />,
  },
  {
    title: 'View Books',
    path: '/view-books',
    icon: <BookOpenIcon className="w-5 h-5 mr-2" />,
  },
  {
    title: 'Add Books',
    path: '/add-book',
    icon: <DocumentTextIcon className="w-5 h-5 mr-2" />,
  },
  {
    title: 'Book Quizes',
    path: '/book-quiz',
    icon: <AcademicCapIcon className="w-5 h-5 mr-2" />,
  },
];


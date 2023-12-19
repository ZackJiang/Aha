import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import TagsPage from '../pages/TagsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/tags',
    element: <TagsPage />,
  },
]);

export default router;

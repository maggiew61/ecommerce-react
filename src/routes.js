import { NotFound} from './containers/pages/pages';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import userAccount from './containers/pages/userAccount';
import productPage from './containers/Product/productPage';
const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    breadcrumbName: 'Home'
  },
  {
    path:"/auth",
    component: Auth,
    exact:true
  },
  {
    path:"/logout",
    component: Logout,
    exact:true
  },
  {
    path:"/user-account",
    component: userAccount,
    exact:true
  },
  {
    path:"/product-page/:id",
    component: productPage,
  },
  {
    component: NotFound,
  },
];

export default routes;

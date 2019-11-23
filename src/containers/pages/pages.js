import React from 'react';
// import { renderRoutes } from 'react-router-config'
// import routes from './routes';
// import { Breadcrumb } from '../components';
// import classes from './pages.module.scss';
// import room1 from '../assets/images/room1.jpg';
// import room2 from '../assets/images/room2.jpg';
// import room3 from '../assets/images/room3.jpg';
// import PostList from '../containers/PostList';
/**
 * These are root pages
 */

// const Posts = () => {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           {/* <CreatePost /> */}
//         </div>
//         <div className="col-md-6">
//           {/* <PostList /> */}
//         </div>
//       </div>
//     </div>
//   );
// };



const NotFound = () => {
  return "Page not found."
}

/**
 * These are pages nested in Electronics
 */
const Mobile = () => {
  return <h3>Mobile Phone</h3>;
};

const Desktop = () => {
  return <h3>Desktop PC</h3>;
};

const Laptop = () => {
  return <h3>Laptop</h3>;
};

export { Mobile, Desktop, Laptop, NotFound };

## Maggie's Notes
###　auth reference
auth reference: udemy/react/section 18-adding authentication

### login
Throughout this project, we use token property in state auth to determine whether users is logged or not. 

### 放東西到購物車--> 登入 --> 並checkout的流程
Without Logged in --
ProductPage.js
users click on立刻結帳. It will invoke a addOrCheckout(). There it will dispatch onOpenCart()to change cart reducer state isOpenCart from false to true. 

Nav.js
In componentDidUpdate(), it will trigger a toggle() for opening the cart when detecting the global state isOpenCart is changed to true. 
From there, if users click on 登入並結帳, it will trigger a singintoCheckout(). There users will be re-directed to auth page and also dispatch a openCartAfterAuth() to change cart reducer state openCartAfterAuth from false to true. 

Auth.js
When users click on 登入, it will trigger a submitHandler(). There it will dispatch an action to change the state auth token from null to something. In render(), once it detects the token contains something(after logged in) and state openCartAfterAuth is true, it will be re-directed to the product page. 

ProductPage.js
In componentDidMount(), if it detects that state openCartAfterAuth is true, it will dispatch onOpenCart()action to change cart reducer state isOpenCart from false to true. Then in Nav.js, the cart will be opened. 

### Styling
global stylesheet: app.module.scss

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

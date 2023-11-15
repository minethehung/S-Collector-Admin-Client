import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Admin from './routes/admin'
import { loader as adminLoader } from './routes/admin'
import Sellers, { loader as sellerLoader } from './routes/seller'
import SellerResetPass, { loader as resetPassLoader, action as sellerResetAction } from './routes/seller-reset-pass'
import Stores, { loader as storeLoader } from './routes/store'
import StoreResetPass, { action as storeResetAction } from './routes/store-reset-pass'
import PayIn, { action as payInAction } from './routes/store-pay-in'
import Order from './routes/order'
import Posts from './routes/post'
import PostDetail, { loader as postDetailLoader, action as postDeleteAction } from './routes/post-detail'
import LoginPage from './routes/login'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {

        path: '',
        element: <Admin />,
        loader: adminLoader,
      },
      {
        path: 'sellers',
        element: <Sellers />,
        loader: sellerLoader,
      },
      {
        path: 'sellers/reset/:id',
        element: <SellerResetPass />,
        loader: resetPassLoader,
        action: sellerResetAction,
      },
      {
        path: 'stores',
        element: <Stores />,
        loader: storeLoader
      },
      {
        path: 'stores/reset/:id',
        element: <StoreResetPass />,
        loader: resetPassLoader,
        action: storeResetAction,
      },
      {
        path: 'stores/pay-in/:id',
        element: <PayIn />,
        loader: resetPassLoader,
        action: payInAction
      },
      {
        path: 'orders',
        element: <Order />,
      },
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'posts/:id',
        element: <PostDetail />,
        loader: postDetailLoader,
        action: postDeleteAction,
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)

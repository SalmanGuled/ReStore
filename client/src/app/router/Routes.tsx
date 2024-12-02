import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/catalog/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/catalog/about/AboutPage";
import ContactPage from "../../features/catalog/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/catalog/basket/BasketPage";
import CheckoutPage from "../../features/catalog/checkout/CheckoutPage";
import Register from "../../features/account/Register";
import RequireAuth from "./RequireAuth";
import Login from "../../features/account/Login";
import Orders from "../../features/orders/Orders";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                { path: '/checkout', element: <CheckoutPage /> },
                { path: '/orders', element: <Orders /> },
            ]},

            {path: '', element: <HomePage />},
            {path: 'catalog', element: <Catalog />},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'about', element: <AboutPage />},
            {path: 'contact', element: <ContactPage />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])
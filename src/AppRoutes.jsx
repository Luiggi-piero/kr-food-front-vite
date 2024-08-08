import { Route, Routes } from "react-router-dom"
import AuthRoute from "./components/AuthRoute/AuthRoute.jsx"
import CartPage from "./pages/Cart/CartPage.jsx"
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx"
import FoodPage from "./pages/Food/FoodPage.jsx"
import HomePage from "./pages/Home/HomePage.jsx"
import LoginPage from "./pages/Login/LoginPage.jsx"
import OrderTrackPage from "./pages/OrderTrack/OrderTrackPage.jsx"
import PaymentPage from "./pages/Payment/PaymentPage.jsx"
import RegisterPage from "./pages/Register/RegisterPage.jsx"
import ProfilePage from "./pages/Profile/ProfilePage.jsx"
import OrdersPage from "./pages/Orders/OrdersPage.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx"
import FoodsAdminPage from "./pages/FoodsAdmin/FoodsAdminPage.jsx"
import FoodEditPage from "./pages/FoodEdit/FoodEditPage.jsx"
import UsersPage from "./pages/UsersPage/UsersPage.jsx"
import UserEditPage from "./pages/UserEdit/UserEditPage.jsx"
import MainPage from "./pages/Main/MainPage.jsx"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/search/:searchTerm" element={<HomePage />}></Route>
            <Route path="/tag/:tag" element={<HomePage />}></Route>
            <Route path="/food/:id" element={<FoodPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>

            <Route
                path="/checkout"
                element={
                    <AuthRoute>
                        <CheckoutPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/payment"
                element={
                    <AuthRoute>
                        <PaymentPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/track/:orderId"
                element={
                    <AuthRoute>
                        <OrderTrackPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <AuthRoute>
                        <ProfilePage />
                    </AuthRoute>
                }
            />
            {/* el parámetro 'filter' es opcional */}
            <Route
                path="/orders/:filter?"
                element={
                    <AuthRoute>
                        <OrdersPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <AuthRoute>
                        <Dashboard />
                    </AuthRoute>
                }
            />
            <Route
                path="/admin/foods/:searchTerm?"
                element={
                    <AdminRoute>
                        <FoodsAdminPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/addFood"
                element={
                    <AdminRoute>
                        <FoodEditPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/editFood/:foodId"
                element={
                    <AdminRoute>
                        <FoodEditPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/users/:searchTerm?"
                element={
                    <AdminRoute>
                        <UsersPage />
                    </AdminRoute>
                }
            />
            <Route
                path="/admin/editUser/:userId"
                element={
                    <AdminRoute>
                        <UserEditPage />
                    </AdminRoute>
                }
            />

        </Routes>
    )
}

export default AppRoutes
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Signin from "./pages/Authentication/Signin/Signin"
import Signup from "./pages/Authentication/Signup/Signup"
import ForgotPassword from "./pages/Authentication/ForgotPassword/ForgotPassword"
import ChangePassword from "./pages/Authentication/ChangePassword/ChangePassword"
import Error404 from "./pages/components/Error404/Error404"
import About from "./pages/About/About"
import Categories from "./pages/Categories/Categories"
import LayoutPage from "./pages/components/Layout"
import UploadPost from "./pages/Upload/UploadPost"
import Category from "./pages/Categories/components/Category"
import BlogDetail from "./pages/Blog/BlogDetail"
import UserDetail from "./pages/User/UserDetail"
import Feedback from "./pages/Feedback/Feedback"
import UpdateUser from "./pages/User/components/UpdateUser"



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:id" element={<Category />} />
                    <Route path="/categories/:id/:id" element={<BlogDetail />} />
                    <Route path="/user" element={<UserDetail />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/setting-user" element={<UpdateUser />} />
                    <Route path="/upload" element={<UploadPost />} />
                    <Route path="*" element={<Error404 />} />
                </Route>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/resetPassword/:email" element={<ChangePassword />} />
                <Route path="/resetPassword" element={<ForgotPassword />} />

            </Routes>
        </Router>
    )
}

export default App
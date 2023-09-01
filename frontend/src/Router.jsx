import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

import { AppPage } from "./pages/AppPage";
import { ProfilePage } from "./pages/ProfilePage"

import { AuthPage } from "./pages/auth/AuthPage"
import { PasswordPage } from "./pages/auth/PasswordPage"
import { SecretPage } from "./pages/auth/SecretPage"
import { Logout } from "./pages/auth/Logout"
import { SetPasswordPage } from "./pages/auth/SetPasswordPage"

export const Router = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/*" element={<NotFoundPage />} />

          {/* auth */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/password" element={<PasswordPage />} />
          <Route path="/auth/secret" element={<SecretPage />} />
          <Route path="/auth/setpassword" element={<SetPasswordPage />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/app" element={<AppPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
};
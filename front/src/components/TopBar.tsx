import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { handleLogout } from "../store/slices/authSlice";
import AddBookModal from "./AddBookModal";
import "../scss/components/_topbar.scss";

const TopBar: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for the "ספר חדש" modal
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const logout = async () => {
    await dispatch(handleLogout());
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="topbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <img
          src="https://via.placeholder.com/40" // Replace with actual logo URL
          alt="Logo"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>My Library</span>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", gap: "20px" }} className="nav-buttons">
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate("/my-books")}>הספרים שלי</button>
            <button onClick={openModal}>ספר חדש</button>
            <button onClick={logout}>התנתקות</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>התחברות</button>
        )}
      </div>

      {/* Add Book Modal */}
      {isAuthenticated && (
        <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default TopBar;

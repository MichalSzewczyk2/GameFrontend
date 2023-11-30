import React, { useState } from "react";
import "./passwordResetModal.scss";

function PasswordResetModal({ onSubmit, onClose, user }) {
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newPassword, user);
    };

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('modal')) {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={(e) => handleBackgroundClick(e)}>
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>Reset Password for {user.username}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordResetModal;
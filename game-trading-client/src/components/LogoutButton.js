

import React from 'react';

function LogoutButton() {
    const handleLogout = () => {
        fetch('http://localhost:5555/logout', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Logged out successfully.");
            } else {
                alert("Error logging out. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error during logout:", error);
            alert("Error logging out. Please try again.");
        });
    };

    return (
        <button onClick={handleLogout}>Sign Out</button>
    );
}

export default LogoutButton;

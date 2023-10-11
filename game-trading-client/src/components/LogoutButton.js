import React from 'react';

const styles = {
    button: {
        marginTop: '10px',
        fontSize: '1.2rem',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: 'skyblue',
    },
};

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
        <button
            onClick={handleLogout}
            style={{ ...styles.button, ...styles.buttonHover }}
        >
            Sign Out
        </button>
    );
}

export default LogoutButton;

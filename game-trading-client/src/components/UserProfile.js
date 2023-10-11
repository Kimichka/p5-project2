import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
        fontFamily: 'cute-font',  // HAHA, Cute right?!
        fontSize: '3rem',  
        textAlign: 'center',
        backgroundColor: 'black',  
        color: 'whitesmoke',  
    },
    boldText: {
        fontWeight: '800',  
    },
    description: {
        marginTop: '10px', 
    },
};

const UserProfile = () => {
    return (
        <div style={styles.container}>
            <p style={styles.boldText}>Loading...</p>
            <p style={styles.description}>The User Profile Page.</p>
        </div>
    );
}

export default UserProfile;

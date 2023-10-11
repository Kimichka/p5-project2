import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', 
        fontFamily: 'cute-font',  //HAHA, Cute right?!
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

const Home = () => {
    return (
        <div style={styles.container}>
            <p style={styles.boldText}>Welcome to The Game Trading Website!</p>
            <p style={styles.description}>Find and trade your favorite games with other users.</p>
        </div>
    );
};

export default Home;

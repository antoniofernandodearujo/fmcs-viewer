import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ marginTop: 30, marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
            <p style={{ color: "#627e76", fontWeight: 'bold' }}>&copy; {currentYear} Antônio Fernando. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
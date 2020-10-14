import React from 'react';
import { Container } from 'reactstrap';

import Header from '../components/Header';

const Layout = ({children}) => {
    return (
        <div>
            <Header />
            <Container>
                {children}
            </Container>
        </div>
    );
};

export default Layout;
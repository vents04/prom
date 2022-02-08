import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './screens/Home/Home';
import Stats from './screens/Stats/Stats';
import Vote from './screens/Vote/Vote';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/vote" element={<Vote />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App;
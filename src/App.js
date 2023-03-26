import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './routes/home';
import AdminPage from './routes/admin';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin-config" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;

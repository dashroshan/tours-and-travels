import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './routes/home';
import AdminPage from './routes/admin';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        const onPageLoad = () => {
            if (window.APIDATALOADED) {
                setTimeout(() => {
                    document.getElementById("loader_block").style.opacity = 0;
                    setTimeout(() => {
                        document.getElementById("loader_block").style.display = "none";
                    }, 310);
                }, 200);
            }
            else {
                setTimeout(() => {
                    onPageLoad();
                }, 200);
            }
        };
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

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

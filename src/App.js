import { Route, Routes, useLocation, Outlet, Navigate } from 'react-router-dom';
import { motion } from "framer-motion";
import HomePage from './routes/home';
import AdminPage from './routes/admin';

const PageLayout = ({ children }) => children;

const pageVariants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
};

const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.5
};

const AnimationLayout = () => {
    const { pathname } = useLocation();
    return (
        <PageLayout>
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                variants={pageVariants}
                transition={pageTransition}
            >
                <Outlet />
            </motion.div>
        </PageLayout>
    );
};

function App() {
    return (
        <div className="App">
            <Routes>
                <Route element={<AnimationLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin-config" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

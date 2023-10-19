import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import DataTableUser from './components/DataTableUser';

function App() {
    return (
        <Router>
            <div className="bg-gray-100 min-h-screen">
                <nav className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <Link to="/utilisateurs" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                                    Gerer les utilisateurs
                                </Link>
                                {/* Ajoutez d'autres liens de navigation ici si nécessaire. */}
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="py-10">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="px-4 py-8 sm:px-0">
                            <Routes>
                                <Route path="/utilisateurs" element={<DataTableUser />} />
                                {/* Définissez d'autres routes pour vos autres composants/pages ici. */}
                            </Routes>
                        </div>
                    </div>
                </main>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import DataTableUser from './components/DataTable';

function App() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        <DataTableUser />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;

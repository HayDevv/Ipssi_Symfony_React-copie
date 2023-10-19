import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import dataFixtures from './dataFixtures';

const DataTableUser = () => {
    const [data, setData] = useState(dataFixtures);
    const [newItem, setNewItem] = useState({id: '', nom: '', prenom: '', age: '', email: '', commandes: ''});
    const [editingId, setEditingId] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:8000/api/utilisateurs');
                const data = await response.json();
                const users = data['hydra:member'];
                const usersArray = [];
                Object.keys(users).map((cle) => {
                    usersArray.push(users[cle])
                });
                setUsers(usersArray)
            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
            }
        };
        fetchData();
    }, []);

    async function getUsers() {
        let response = await fetch('https://localhost:8000/api/utilisateurs')
        let data = await response.json()
        const users = await data['hydra:member'];
        const usersArray = [];

        Object.keys(users).map((cle) => {
            usersArray.push(users[cle])
        });

        return usersArray;
    }

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleUpdate = (id) => {
        const updatedData = data.map((item) => (item['@id'] === id ? newItem : item));
        setData(updatedData);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item['@id'] !== id);
        setData(updatedData);
    };

    const handleInputChange = (e, key) => {
        const value = e.target.value;
        setNewItem({...newItem, [key]: value});
    };

    async function createUser(nom, prenom, age, email) {
        age = Number(age)
        let response = await fetch('https://localhost:8000/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({nom, prenom, age, email})
        })
        const data = await response.json();
        // console.log(data)
    }

    const handleAdd = () => {
        if (newItem.nom && newItem.prenom && newItem.age && newItem.email) {

            createUser(newItem.nom, newItem.prenom, newItem.age, newItem.email)

            setData([...data, newItem]);
            setNewItem({nom: '', prenom: '', age: '', email: '', commandes: ''});

        } else {
            alert('Veuillez remplir tous les champs.');
        }
    };

    // console.log(users)
    users.map((user) => {
        console.log(user['@id'])
    })
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Tableau des Utilisateurs</h1>
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Nom</th>
                    <th className="px-4 py-2">Prénom</th>
                    <th className="px-4 py-2">Age</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((item) => (
                    <tr key={item.id} className={editingId === item.id ? 'bg-yellow-100' : ''}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">
                            {editingId === item.id ? (
                                <input
                                    type="text"
                                    value={newItem.nom}
                                    onChange={(e) => handleInputChange(e, 'nom')}
                                    className="w-full"
                                />
                            ) : (
                                item.nom
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === item.id ? (
                                <input
                                    type="text"
                                    value={newItem.prenom}
                                    onChange={(e) => handleInputChange(e, 'prenom')}
                                    className="w-full"
                                />
                            ) : (
                                item.prenom
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === item.id ? (
                                <input
                                    type="text"
                                    value={newItem.age}
                                    onChange={(e) => handleInputChange(e, 'age')}
                                    className="w-full"
                                />
                            ) : (
                                item.age
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === item.id ? (
                                <input
                                    type="text"
                                    value={newItem.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    className="w-full"
                                />
                            ) : (
                                item.email
                            )}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === item.id ? (
                                <>
                                    <button
                                        onClick={() => handleUpdate(item.id)}
                                        className="bg-green-500 text-white px-2 py-1 mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Ajouter un Utilisateur</h2>
                <div className="grid grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={newItem.nom}
                        onChange={(e) => handleInputChange(e, 'nom')}
                        className="border rounded-md px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={newItem.prenom}
                        onChange={(e) => handleInputChange(e, 'prenom')}
                        className="border rounded-md px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Age"
                        value={newItem.age}
                        onChange={(e) => handleInputChange(e, 'age')}
                        className="border rounded-md px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={newItem.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        className="border rounded-md px-3 py-2"
                    />
                </div>
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-3 py-2 mt-2 rounded-md"
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
};

export default DataTableUser;


// const DataTableUser = () => {
//         const [data, setData] = useState([]);

//         useEffect(() => {
//             fetch('https://example.com/api/data')
//                 .then(response => response.json())
//                 .then(data => setData(data))
//                 .catch(error => console.error(error));
//         }, []);

//         const handleEdit = (id) => {
//             console.log(`Edit item with id ${id}`);
//         };

//         const handleDelete = (id) => {
//             console.log(`Delete item with id ${id}`);
//         };

//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Nom</th>
//                         <th>Prénom</th>
//                         <th>Age</th>
//                         <th>Email</th>
//                         <th>Commandes</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item) => (
//                         <tr key={item['@id']}>
//                             <td>{item['@id']}</td>
//                             <td>{item['nom']}</td>
//                             <td>{item['prenom']}</td>
//                             <td>{item['age']}</td>
//                             <td>{item['email']}</td>
//                             <td>{item.commandes}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(item['@id'])}>Edit</button>
//                                 <button onClick={() => handleDelete(item['@id'])}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         );
//     };

// export default DataTableUser;
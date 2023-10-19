import React, { useState, useEffect } from 'react';
import dataFixtures from './dataFixtures'; // Importez vos fixtures

const DataTableUser = () => {
    const [data, setData] = useState(dataFixtures);
    const [newItem, setNewItem] = useState({ id: '', nom: '', prenom: '', age: '', email: '', commandes: '' });
    const [editingId, setEditingId] = useState(null);

    const handleEdit = (id) => {
        setEditingId(id);
    };

    const handleUpdate = (id) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return newItem;
            }
            return item;
        });
        setData(updatedData);
        setEditingId(null);
    };

    const handleDelete = (id) => {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
    };

    const handleInputChange = (e, key) => {
        const value = e.target.value;
        setNewItem({ ...newItem, [key]: value });
    };

    const handleAdd = () => {
        if (newItem.nom && newItem.prenom && newItem.age && newItem.email) {
            setData([...data, newItem]);
            setNewItem({ nom: '', prenom: '', age: '', email: ''});
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Commandes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{editingId === item.id ? <input type="text" value={newItem.nom} onChange={(e) => handleInputChange(e, 'nom')} /> : item.nom}</td>
                            <td>{editingId === item.id ? <input type="text" value={newItem.prenom} onChange={(e) => handleInputChange(e, 'prenom')} /> : item.prenom}</td>
                            <td>{editingId === item.id ? <input type="text" value={newItem.age} onChange={(e) => handleInputChange(e, 'age')} /> : item.age}</td>
                            <td>{editingId === item.id ? <input type="text" value={newItem.email} onChange={(e) => handleInputChange(e, 'email')} /> : item.email}</td>
                            <td>{editingId === item.id ? <input type="text" value={newItem.commandes} onChange={(e) => handleInputChange(e, 'commandes')} /> : item.commandes}</td>
                            <td>
                                {editingId === item.id ? (
                                    <>
                                        <button onClick={() => handleUpdate(item.id)}>Update</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(item.id)}>Edit</button>
                                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Add User</h2>
                <input type="text" placeholder="Nom" value={newItem.nom} onChange={(e) => handleInputChange(e, 'nom')} />
                <input type="text" placeholder="Prénom" value={newItem.prenom} onChange={(e) => handleInputChange(e, 'prenom')} />
                <input type="text" placeholder="Age" value={newItem.age} onChange={(e) => handleInputChange(e, 'age')} />
                <input type="text" placeholder="Email" value={newItem.email} onChange={(e) => handleInputChange(e, 'email')} />
                <button onClick={handleAdd}>Add</button>
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
//                         <tr key={item.id}>
//                             <td>{item.id}</td>
//                             <td>{item.nom}</td>
//                             <td>{item.prenom}</td>
//                             <td>{item.age}</td>
//                             <td>{item.email}</td>
//                             <td>{item.commandes}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(item.id)}>Edit</button>
//                                 <button onClick={() => handleDelete(item.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         );
//     };

// export default DataTableUser;
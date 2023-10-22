import React, {useEffect, useState} from 'react';
import dataFixtures from './dataFixtures';
import {createUser} from '../function/userFunction'
import {deleteMethod, getMethod, updateMethod} from "../function/httpFunction";

const DataTableUser = () => {
    const [data, setData] = useState(dataFixtures);
    const [newItem, setNewItem] = useState({id: '', nom: '', prenom: '', age: '', email: '', commandes: ''});
    const [editingId, setEditingId] = useState(null);
    const [users, setUsers] = useState([]);

    const [newNom, setNewNom] = useState(null);
    const [newPrenom, setNewPrenom] = useState(null);
    const [newAge, setNewAge] = useState(0);
    const [newEmail, setNewEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersArray = await getMethod('utilisateurs');
                setUsers(usersArray)
            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (id) => {
        alert("Attention il faut modifier TOUS les champs, on n'as pas eu le temps d'améliorer ca !");
        setEditingId(id);
    };

    const handleUpdate = async (id) => {

        let object = {}; // Initialiser l'objet

        // Vérification des valeurs et affectation à l'objet
        if (newNom !== null && newNom !== '') {
            object.nom = newNom;
        }
        if (newPrenom !== null && newPrenom !== '') {
            object.prenom = newPrenom;
        }
        if (newAge !== null && newAge !== 0) {
            object.age = parseInt(newAge, 10);
        }
        if (newEmail !== null && newEmail !== '') {
            object.email = newEmail;
        }

        let response = await updateMethod(id, object, 'utilisateurs');

        const status = response.status;

        if (status === 200) {
            alert('Modification réussie.');
            window.location.reload();
        }
    };

    async function handleDelete(id) {
        let response = await deleteMethod(id, 'utilisateurs')

        if (response.status === 204) {
            alert('Suppression réussie.');
            window.location.reload();
        }
    }

    const handleInputChange = (e, key) => {
        const value = e.target.value;
        setNewItem({...newItem, [key]: value});
    };

    const handleInputChangeOnUpdate = (e) => {
        const value = e.target.value;
        const input = e.target.getAttribute('data-input');

        switch (input) {
            case 'nom' :
                e.target.value =
                    setNewNom(value);
                break
            case 'prenom':
                setNewPrenom(value)
                break
            case 'age' :
                setNewAge(value)
                break
            case 'email' :
                setNewEmail(value)
                break;

        }
    };

    const handleAdd = async () => {
        if (!newItem.nom || !newItem.prenom || !newItem.age || !newItem.email) {
            alert('Veuillez remplir tous les champs.');
        }

        let response = await createUser('utilisateurs',newItem.nom, newItem.prenom, newItem.age, newItem.email)

        if (response.status === 201) {
            alert('Creation réussie.');
            setData([...data, newItem]);
            setNewItem({nom: '', prenom: '', age: '', email: '', commandes: ''});
            window.location.reload();
        }
    };


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
                                    value={newNom}
                                    data-input="nom"
                                    onChange={(e) => handleInputChangeOnUpdate(e)}
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
                                    data-input="prenom"
                                    value={newPrenom}
                                    onChange={(e) => handleInputChangeOnUpdate(e)}
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
                                    data-input="age"
                                    value={newAge}
                                    onChange={(e) => handleInputChangeOnUpdate(e)}
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
                                    data-input="email"
                                    value={newEmail}
                                    onChange={(e) => handleInputChangeOnUpdate(e)}
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
                                        onClick={() => handleUpdate(item.id, item.nom, item.prenom, item.age, item.email)}
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
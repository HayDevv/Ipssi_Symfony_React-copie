import React, {useEffect, useState} from 'react';
import dataFixtures from './dataFixtures';

const DataTableUser = () => {
    const [data, setData] = useState(dataFixtures);
    const [newItem, setNewItem] = useState({id: '', nom: '', prenom: '', age: '', email: '', commandes: ''});
    const [editingId, setEditingId] = useState(null);
    const [commandes, setCommandes] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [selectedUser, setSelectedUser] = useState(''); // État pour stocker l'utilisateur sélectionné


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:8000/api/commandes')
                let data = await response.json()
                const commandes = await data['hydra:member'];
                const commandesArray = [];

                Object.keys(commandes).map((cle) => {
                    commandesArray.push(commandes[cle])
                });

                const responseUsers = await fetch('https://localhost:8000/api/utilisateurs');
                const dataUsers = await responseUsers.json();
                const users = dataUsers['hydra:member'];
                const usersArray = [];
                Object.keys(users).map((cle) => {
                    usersArray.push(users[cle])
                });
                setUsers(usersArray)

                setCommandes(commandesArray)
            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
            }
        };
        fetchData();
    }, []);

    async function handleDelete(id) {
        let response = await fetch(`https://localhost:8000/api/utilisateurs/${id}`, {
            method: 'DELETE'
        })
        const status = response.status;

        if (status === 204) {
            alert('Suppression réussie.');
            window.location.reload();
        }
    }


    async function createUser(nom, prenom, age, email) {
        age = Number(age)
        let response = await fetch('https://localhost:8000/api/utilisateurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({nom, prenom, age, email})
        })

        const status = response.status;

        if (status === 201) {
            alert('Creation réussie.');
            window.location.reload();
        }
    }

    function handleUserChange(e){
        setUserId(e.target.value)
    }

    const handleChange = (event) => {
        setSelectedUser(event.target.value); // Mettre à jour l'état avec la valeur sélectionnée
    };

    async function handleAdd(){

        if(selectedUser == '' ) {
            alert('Veuillez selectionner un utilisateur');
            return;
        }
        console.log(selectedUser);

        let response = await fetch(`https://localhost:8000/api/commandes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({"utilisateur": {"@id": selectedUser}})
        })

        const status = response.status;

        if(status == 201){
            alert('Comande ajouté avec succés')
            window.location.reload();
        }
    }



    function formatCommandDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        const timeDifference = now - date; // Différence en millisecondes
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
            return `Commandé il y a ${years} an${years > 1 ? 's' : ''}`;
        } else if (months > 0) {
            return `Commandé il y a ${months} mois`;
        } else if (days > 0) {
            return `Commandé il y a ${days} jour${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `Commandé il y a ${hours} heure${hours > 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `Commandé il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
            return `Commandé il y a ${seconds} seconde${seconds > 1 ? 's' : ''}`;
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Tableau de Commandes</h1>
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Date de la commande</th>
                    <th className="px-4 py-2">Utilisateur</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {commandes.map((item) => (
                    // <p>{JSON.stringify(item)}</p>
                    <tr key={item.id} className={editingId === item.id ? 'bg-yellow-100' : ''}>
                        <td className="border px-4 py-2">{item.id}</td>
                        {/*<td className="border px-4 py-2">{JSON.stringify(item)}</td>*/}
                        <td className="border px-4 py-2">{formatCommandDate(item.dateCommande)}</td>
                        <td className="border px-4 py-2">
                            {item.utilisateur && Object.entries(item.utilisateur).map(([key, value], index) => (
                                <div key={index}>
                                    {key}: {value}
                                </div>
                            ))}
                        </td>
                        <td className="border px-4 py-2">
                            {editingId === item.id ? (
                                <>
                                    <button
                                        // onClick={() => handleUpdate(item.id, item.nom, item.prenom, item.age, item.email)}
                                        className="bg-green-500 text-white px-2 py-1 mr-2"
                                    >
                                        Update
                                    </button>
                                    <button
                                        // // onClick={() => setEditingId(null)}
                                        className="bg-red-500 text-white px-2 py-1"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        // onClick={() => handleEdit(item.id)}
                                        className="bg-blue-500 text-white px-2 py-1 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        // onClick={() => handleDelete(item.id)}
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
                    <select onChange={handleChange}>
                        <option value="">Sélectionnez un utilisateur</option> {/* Option par défaut */}
                        {users.map((item, index) => (
                            <option key={item['@id']} value={item['@id']}>
                                {item.nom} - {item.prenom}
                            </option>
                        ))}
                    </select>
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

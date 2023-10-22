import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {deleteMethod} from "../function/httpFunction";
import {httpURL} from "../function/httpURL";


const url = httpURL

const UniqueCommande = () => {
    const [editingId, setEditingId] = useState(null);
    const [commandes, setCommandes] = useState([]);


    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}commande/user/${id}`)
                let data = await response.json()
                console.log(data)
                setCommandes(data)
            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
            }
        };
        fetchData();
    }, []);

    async function handleDelete(id) {
        let response = await deleteMethod('commandes', id)
        const status = response.status;

        if (status === 204) {
            alert('Suppression réussie.');
            window.location.reload();
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Tableau de Commandes</h1>
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-2">Nom utilisateur</th>
                    <th className="px-4 py-2">Nom produit</th>
                    <th className="px-4 py-2">Quantite</th>
                </tr>
                </thead>
                <tbody>
                {commandes.map((item) => (
                    <tr key={item.nom} className={editingId === item.id ? 'bg-yellow-100' : ''}>
                        <td className="border px-4 py-2">{item.nom} - {item.prenom}</td>
                        <td className="border px-4 py-2">{item.nom_produit}</td>
                        <td className="border px-4 py-2">{item.quantite}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UniqueCommande;

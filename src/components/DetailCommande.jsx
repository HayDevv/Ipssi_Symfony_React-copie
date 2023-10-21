import React, {useEffect, useState} from 'react';
import dataFixtures from './dataFixtures';
import {useParams} from 'react-router-dom';
import {type} from "@testing-library/user-event/dist/type";
import {deleteMethod, getMethod} from "../function/httpFunction";


const DetailsCommandes = () => {
    const [detailsCommande, setDetailsProduit] = useState([]);
    const [produits, setProduit] = useState([]);
    const [commandes, setCommandes] = useState([]);
    const [selectedProduit, setSelectedProduit] = useState('');
    const [selectedCommande, setSelectedCommande] = useState('')
    const [quantite, setQuantite] = useState(0)

    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detailsCommande = await getMethod('detail_commandes')
                setDetailsProduit(detailsCommande)

                const produitsArray = await getMethod('produits')
                setProduit(produitsArray)

                const commandesArray = await getMethod('commandes')
                setCommandes(commandesArray)

            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
            }
        };
        fetchData();
    }, []);

    async function handleDelete(id) {
        let response = await deleteMethod(id, 'detail_commandes')
        const status = response.status;

        if (status === 204) {
            alert('Suppression réussie.');
            window.location.reload();
        }
    }

    function handleChangeQuantite(e) {
        console.log(e.target.value)
        setQuantite(e.target.value)
    }

    const handleSelectedProduit = (event) => {
        setSelectedProduit(event.target.value); // Mettre à jour l'état avec la valeur sélectionnée
    };

    function handleSetCommande(event) {
        console.log(event.target.value)
        setSelectedCommande(event.target.value)
    }

    async function handleAdd() {

        const numberQuantite = Number(quantite)

        let response = await fetch(`https://localhost:8000/api/detail_commandes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({"produit": selectedProduit, "commande": selectedCommande, "quantite": numberQuantite})
        })

        const status = response.status;

        if (status == 201) {
            alert('Comande ajouté avec succés')
            window.location.reload();
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Tableau de Commandes</h1>
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Produit</th>

                    <th className="px-4 py-2">Quantite</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {detailsCommande.map((item) => (
                    <tr key={item.id}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">
                           Id: {item.produit.id}<br/>
                            Nom: {item.produit.nomProduit}<br/>
                            Prix: {item.produit.prix}<br/>
                            Stock: {item.produit.stock}
                        </td>
                        <td className="border px-4 py-2">{item.quantite}</td>
                        <td className="border px-4 py-2">
                            <>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="bg-red-500 text-white px-2 py-1"
                                >
                                    Delete
                                </button>
                            </>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Ajouter un Detail commande</h2>
                <div className="grid grid-cols-4 gap-4">
                    <select onChange={handleSelectedProduit}>
                        <option value="">Sélectionnez un Produit</option>
                        {/* Option par défaut */}
                        {produits.map((item, index) => (
                            <option key={item['@id']} value={item['@id']}>
                                {item.nomProduit}
                            </option>
                        ))}
                    </select>
                    <select onChange={handleSetCommande}>
                        <option value="">Sélectionnez un Commande</option>
                        {/* Option par défaut */}
                        {commandes.map((item, index) => (
                            <option key={item['@id']} value={item['@id']}>
                                Commande numero {item.id}
                            </option>
                        ))}
                    </select>
                    <input type="number" value={quantite} onChange={handleChangeQuantite}/>
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

export default DetailsCommandes;

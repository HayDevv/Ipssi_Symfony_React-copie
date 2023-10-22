import React, {useEffect, useState} from 'react';
import {deleteMethod, getMethod} from "../function/httpFunction";
import {httpURL} from "../function/httpURL";


const url = httpURL

const Produit = () => {
    const [produits, setProduits] = useState([]);
    const [item, setNewItem] = useState({id: '', nomProduit: '', prix: '', stock: ''})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const produits = await getMethod('produits')
                setProduits(produits)
            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
            }
        };
        fetchData();
    }, []);

    async function handleDelete(id) {
        let response = await deleteMethod(id, 'produits')
        const status = response.status;

        if (status === 204) {
            alert('Suppression réussie.');
            window.location.reload();
        }
    }


    async function createProduit(nomProduit, prix, stock) {
        prix = Number(prix)
        stock = Number(stock)

       return  await fetch(`${url}produits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify({nomProduit, prix, stock})
        })

    }

    async function handleAdd() {
        if (!item.nomProduit || !item.prix || !item.stock) {
            alert('Veuillez remplir tous les champs.');
        }

        let response = await createProduit(item.nomProduit, item.prix, item.stock)

        const status = response.status;

        if (status === 201) {
            alert('Creation réussie.');
        }
        setNewItem({nomProduit: '', prix: '', stock: ''});
        window.location.reload();

    }


    const handleInputChange = (e, key) => {
        const value = e.target.value;
        setNewItem({...item, [key]: value});
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Tableau des Produits</h1>
            <table className="table-auto w-full">
                <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Nom produit</th>
                    <th className="px-4 py-2">Prix</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {produits.map((item) => (
                    <tr key={item.id}>
                        <td className="border px-4 py-2">{item.id}</td>
                        <td className="border px-4 py-2">{item.nomProduit}</td>
                        <td className="border px-4 py-2">{item.prix}</td>
                        <td className="border px-4 py-2">{item.stock}</td>
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
                <h2 className="text-xl font-bold mb-2">Ajouter un Produit</h2>
                <div className="grid grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="Nom Produit"
                        value={item.nomProduit}
                        onChange={(e) => handleInputChange(e, 'nomProduit')}
                        className="border rounded-md px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Prix"
                        value={item.prix}
                        onChange={(e) => handleInputChange(e, 'prix')}
                        className="border rounded-md px-3 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Sotck"
                        value={item.stock}
                        onChange={(e) => handleInputChange(e, 'stock')}
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
}


export default Produit;

const url = 'https://localhost:8000/api/'
export async function getMethod(endpoint) {
    const response = await fetch(`${url}${endpoint}`);
    const data = await response.json();
    const users = data['hydra:member'];
    const usersArray = [];
    console.log(data)
    Object.keys(users).map((cle) => {
        usersArray.push(users[cle])
    });

    return usersArray;
}

export async function updateMethod(id, object,endpoint) {
    return await fetch(`${url}${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/ld+json'
        },
        body: JSON.stringify(object)
    })
}

export async function deleteMethod(id, endpoint) {
    return await fetch(`${url}${endpoint}/${id}`, {
        method: 'DELETE'
    })
}



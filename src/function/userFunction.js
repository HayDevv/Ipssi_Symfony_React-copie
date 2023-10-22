import {httpURL} from "./httpURL";

const url = httpURL
export async function createUser(endpoint,...userData) {
    const userObject = {};
    const keys = ['nom', 'prenom', 'age', 'email'];

    userData.forEach((param, index) => {
        if (index < keys.length) {
            const key = keys[index];
            if (key === 'age') {
                userObject[key] = parseInt(param, 10);
            } else {
                userObject[key] = param;
            }
        }
    });

    return await fetch(`${url}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json'
        },
        body: JSON.stringify(userObject)
    });
}
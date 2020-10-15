export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user.headers'));

    if (user && user.authorization) {
        return { Authorization: user.authorization };
    } else {
        return {};
    }
}

export function authData() {
    return JSON.parse(localStorage.getItem('user.data'));
}

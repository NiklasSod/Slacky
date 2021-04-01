/* When page is loaded this script fetches users and renders it */

renderUsers = (users) => {
    users.forEach((user) => {

        usersUl = document.getElementById('usersUl')
        const li = document.createElement('li')
        li.id = user._id
        li.style.textAlign = "center"

        const a = document.createElement('a')
        // a.href = `../channels/startDM/${user._id}`
        a.innerHTML = user.name
        a.style.textDecoration = "none"

        li.appendChild(a)
        usersUl.appendChild(li)

        // usersOnline = document.getElementById('usersOnline')
        // const li2 = document.createElement('li')
        // if user online do this -> li2.innerHTML = 'yes'
        // li2.style.textAlign = "center"
        // usersOnline.appendChild(li2)
    });
};

fetchUsers = () => {
    fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((res) => res.json())
    .then((data) => {
        renderUsers(data);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers()
})
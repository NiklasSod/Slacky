/* When page is loaded this script fetches users and renders it */

renderUsers = (users) => {
    users.forEach((user) => {
        const li = document.createElement('li');
        li.id = user._id;
        /* const img = document.createElement('img');
        img.classList.add('icon_image');
        img.src = user.profilePhoto;
        img.alt = user.name;
        li.appendChild(img); */
        const a = document.createElement('a');
        a.href = `../channels/startDM/${user._id}`;
        a.innerHTML = user.name;
        a.style.textDecoration = "none"
        li.appendChild(a);
        li.style.textAlign = "center"
        usersUl.appendChild(li);
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
    fetchUsers();
});
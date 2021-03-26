renderUsers = (users) => {
    users.forEach((user) => {
        const li = document.createElement('li');
        li.id = user._id;
        const a = document.createElement('a');
        a.href = `../channels/startDM/${user._id}`;
        a.innerHTML = user.name;
        li.appendChild(a);
        usersUl.appendChild(li);
    });
};

fetchUsers = () => {
    fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((data) => {
        renderUsers(data);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    // fetchChannels();
    fetchUsers();
});


// putting required on form was way better

// const btn = document.getElementById('submit');
// let by = document.getElementById('by');
// let content = document.getElementById('content');
// const form = document.getElementById('form');
// form.addEventListener('keyup', (e) => {
//     by.value === '' || content.value === ''
//         ? (btn.disabled = true)
//         : (btn.disabled = false);
// });
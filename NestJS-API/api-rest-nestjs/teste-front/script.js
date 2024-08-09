const apiUrl = 'http://localhost:3000/users';

// Function to create a user
document.getElementById('createUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, cpf }),
    });

    if (response.ok) {
        alert('User created successfully!');
        fetchAllUsers(); // Optionally refresh the list
    } else {
        alert('Failed to create user.');
    }
});

// Function to fetch all users
async function fetchAllUsers() {
    const response = await fetch(apiUrl);
    const users = await response.json();

    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, CPF: ${user.cpf}`;
        userList.appendChild(li);
    });
}

// Function to find a user by ID
async function findUser() {
    const userId = document.getElementById('findUserId').value;

    const response = await fetch(`${apiUrl}/${userId}`);
    const user = await response.json();

    const foundUserDiv = document.getElementById('foundUser');
    foundUserDiv.innerHTML = '';

    if (response.ok) {
        foundUserDiv.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, CPF: ${user.cpf}`;
    } else {
        foundUserDiv.textContent = 'User not found.';
    }
}

// Function to update a user
document.getElementById('updateUserForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('updateUserId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const cpf = document.getElementById('updateCpf').value;

    const response = await fetch(`${apiUrl}/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, cpf }),
    });

    if (response.ok) {
        alert('User updated successfully!');
        fetchAllUsers(); // Optionally refresh the list
    } else {
        alert('Failed to update user.');
    }
});

// Function to delete a user
async function deleteUser() {
    const userId = document.getElementById('deleteUserId').value;

    const response = await fetch(`${apiUrl}/${userId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('User deleted successfully!');
        fetchAllUsers(); // Optionally refresh the list
    } else {
        alert('Failed to delete user.');
    }
}

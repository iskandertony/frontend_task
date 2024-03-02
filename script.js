document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const refreshButton = document.getElementById('refreshButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', () => {
        fetchUsers(searchInput.value.toLowerCase());
    });

    refreshButton.addEventListener('click', () => {
        searchInput.value = ''; // Очистить поле поиска
        fetchUsers(); // Вызвать fetchUsers без параметра, чтобы получить и отобразить весь список
    });

    fetchUsers(); // Инициализирующий вызов для отображения всех пользователей при загрузке страницы
});



async function fetchUsers(filter = '') {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(filter) || user.email.toLowerCase().includes(filter)
        );
        displayUsers(filteredUsers);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        // Здесь вы можете добавить отображение сообщения об ошибке в вашем UI, если нужно
    }
}


function displayUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <h3 class="title">${user.name}</h3>
            <p class="text">Email: ${user.email}</p>
            <p class="text">Phone: ${user.phone}</p>
        `;
        userList.appendChild(userCard);
    });
}

// DOM Elements
// const loginForm = document.getElementById('loginForm');
// const loginContainer = document.getElementById('loginContainer');
// const dashboard = document.getElementById('dashboard');
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const logoutBtn = document.getElementById('logoutBtn');
// const mainBody = document.getElementById('mainBody');


// Login Handler
// loginForm.addEventListener('submit', (e) => {
//     // e.preventDefault();
//     window.location.href = 'index.html';
//     // loginContainer.classList.add('hidden');
//     // dashboard.classList.remove('hidden');
//     // mainBody.classList.remove('login-page');
//     // initializeDashboard();
// });

initializeDashboard();

// Logout Handler
logoutBtn.addEventListener('click', () => {
    // e.preventDefault();
    window.location.href = 'login.html';
    // dashboard.classList.add('hidden');
    // loginContainer.classList.remove('hidden');
    // mainBody.classList.add('login-page');
});

// Sidebar Toggle
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Page Navigation
const menuItems = document.querySelectorAll('.sidebar-menu li');
const pages = document.querySelectorAll('.page');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const pageId = item.getAttribute('data-page');
        
        // Update active menu item
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Show selected page
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId + 'Page') {
                page.classList.add('active');
            }
        });
    });
});

// Initialize Charts
function initializeDashboard() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: '#2ecc71',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Sales'
                }
            }
        }
    });

    // Users Chart
    const usersCtx = document.getElementById('usersChart').getContext('2d');
    new Chart(usersCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New Users',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'New Users per Month'
                }
            }
        }
    });

    // Initialize Users Table
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    ];

    const usersTableBody = document.getElementById('usersTableBody');
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn-edit" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// User Management Functions
function editUser(id) {
    alert(`Edit user ${id}`);
}

function deleteUser(id) {
    alert(`Delete user ${id}`);
}

// Mobile Responsive Menu
if (window.innerWidth <= 768) {
    sidebar.classList.add('collapsed');
    
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('show');
        }
    });

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('show');
    });
}
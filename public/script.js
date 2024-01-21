document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display data when the page loads
    fetchAllData();

    // Handle form submission for adding new data
    document.getElementById('add-data-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {
            username: formData.get('newUsername'),
            email: formData.get('newEmail'),
            password: formData.get('newPassword'),
        };

        // Send new data to server API
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(newData => {
            // Display the newly added data
            displayData(newData);
            // Clear the form
            event.target.reset();
        })
        .catch(error => console.error('Error adding data:', error));
    });

    // Handle form submission for updating data
    document.getElementById('update-data-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const id = formData.get('updateId');
        const data = {
            username: formData.get('updateUsername'),
            email: formData.get('updateEmail'),
            password: formData.get('updatePassword'),
        };

        // Send the updated data to the server API
        fetch(`/api/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(updatedData => {
            // Display the updated data
            displayData(updatedData);
            // Clear the form
            event.target.reset();
        })
        .catch(error => console.error('Error updating data:', error));
    });

    // Handle form submission for deleting data
    document.getElementById('delete-data-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const id = document.getElementById('deleteId').value;

        // Send the delete request to the server API
        fetch(`/api/data/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(result => {
            // Display the delete result
            console.log(result);
            // Clear the form
            event.target.reset();
        })
        .catch(error => console.error('Error deleting data:', error));
    });
});

// New function to fetch all data from the server
function fetchAllData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            // Display the fetched data
            data.forEach(displayData);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// New function to fetch data by ID from the server
function fetchDataById() {
    const id = document.getElementById('dataId').value;

    fetch(`/api/data/${id}`)
        .then(response => response.json())
        .then(data => {
            // Display the fetched data
            displayData(data);
        })
        .catch(error => console.error('Error fetching data by ID:', error));
}

// Function to display data in the list
function displayData(data) {
    const dataList = document.getElementById('data-list');
    const listItem = document.createElement('li');
    listItem.textContent = `ID: ${data.id}, Username: ${data.username}, Email: ${data.email}, Password: ${data.password}`;
    dataList.appendChild(listItem);
}

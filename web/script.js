// Fetch recyclers from the backend
async function getRecyclers() {
    const response = await fetch('http://127.0.0.1:5000/recyclers');
    const recyclers = await response.json();
    const recyclerList = document.getElementById('recyclerList');

    recyclers.forEach((recycler) => {
        const li = document.createElement('li');
        li.textContent = `${recycler.name} (Accepts: ${recycler.acceptedWaste.join(', ')})`;
        recyclerList.appendChild(li);
    });
}

// Handle waste submission
document.getElementById('wasteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const wasteType = document.getElementById('wasteType').value;
    const quantity = document.getElementById('quantity').value;

    const response = await fetch('http://127.0.0.1:5000/submit-waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wasteType, quantity })
    });

    const result = await response.json();
    alert(result.message);
});

// Load recyclers on page load
getRecyclers();

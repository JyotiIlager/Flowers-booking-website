document.getElementById('flowerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const flower = document.getElementById('flower').value;
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const date = document.getElementById('date').value;

    const booking = { name, flower, quantity, address, date };
    try {
        const response = await fetch('http://localhost:3000/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(booking)
        });
        const data = await response.json();
        document.getElementById('confirmation').textContent = data.message;
        document.getElementById('flowerForm').reset();
    } catch (err) {
        document.getElementById('confirmation').textContent = 'Booking failed. Please try again.';
    }
});

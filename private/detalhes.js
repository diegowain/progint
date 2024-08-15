document.addEventListener('DOMContentLoaded', function() {
    const ticketPriceElement = document.getElementById('ticket-price');
    const ticketQuantityInput = document.getElementById('ticket-quantity');
    const totalCostElement = document.getElementById('total-cost');

    const ticketPrice = parseFloat(ticketPriceElement.textContent.replace(',', '.'));

    ticketQuantityInput.addEventListener('input', function() {
        const quantity = parseInt(ticketQuantityInput.value);
        const totalCost = ticketPrice * quantity;

        totalCostElement.textContent = totalCost.toFixed(2).replace('.', ',');
    });
});

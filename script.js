document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const filterSelect = document.getElementById('filterSelect');
  const table = document.getElementById('bookingTable').getElementsByTagName('tbody')[0];

  // Live Search
  searchInput.addEventListener('keyup', () => {
    const term = searchInput.value.toLowerCase();
    Array.from(table.rows).forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(term) ? '' : 'none';
    });
  });

  // Filter by category (static for now)
  filterSelect.addEventListener('change', () => {
    const type = filterSelect.value;
    Array.from(table.rows).forEach(row => {
      const cell = row.cells[4].innerText.toLowerCase();
      if (type === 'all' || cell.includes(type)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });

  // Button actions (mock)
  table.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const row = e.target.closest('tr');
      const statusCell = row.querySelector('.status');
      const action = e.target.className;

      if (action.includes('approve')) {
        statusCell.textContent = 'Approved';
        statusCell.className = 'status approved';
      } else if (action.includes('reject')) {
        statusCell.textContent = 'Rejected';
        statusCell.className = 'status rejected';
      } else if (action.includes('delete')) {
        row.remove();
      } else if (action.includes('edit')) {
        alert('Edit feature coming soon!');
      }
    }
  });
  
});

const SHEET_ID = '1o1vbTgZQFEE-5UYcLKNdn_d7NPRMys9xAjZezETRs8I';
const SHEET_NAME = 'Sheet1'; // Adjust to the actual sheet name if different

async function fetchData() {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`);
    const text = await response.text();
    const json = JSON.parse(text.substring(47, text.length - 2));
    return json.table.rows.map(row => row.c.map(cell => cell ? cell.v : ''));
}

function createTable(data) {
    const headerRow = document.getElementById('header-row');
    const dataRows = document.getElementById('data-rows');

    // Create the table header for 'Waste Type', 'Weight', and 'Price'
    ['Waste Type', 'Weight', 'Price'].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Populate the table with data from the sheet
    data.forEach(row => {
        const tr = document.createElement('tr');

        // Ensure we only take the first three columns (Waste Type, Weight, Price)
        const relevantData = row.slice(0, 3); // Adjust slice to include only first three columns

        relevantData.forEach((cell, index) => {
            const td = document.createElement('td');
            td.textContent = cell; // Display cell value
            td.setAttribute('data-label', ['Waste Type', 'Weight', 'Price'][index]);
            tr.appendChild(td);
        });
        dataRows.appendChild(tr);
    });
}


// Add event listener to download button
document.getElementById('downloadBtn').addEventListener('click', function() {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=xlsx&id=${SHEET_ID}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Student_Report.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

fetchData().then(data => {
    createTable(data);
}).catch(error => {
    console.error('Error fetching data:', error);
});
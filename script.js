async function loadTable() {
    const tableBody = document.getElementById("student-list");
    
    try {
        // Backend API-la irundhu data-va fetch panrom
        const response = await fetch('http://127.0.0.1:5000/students');
        const students = await response.json();
        
        tableBody.innerHTML = ''; // Old data-va clear pannum

        students.forEach(s => {
            const rowClass = s.status === "High Risk" ? "high-risk" : "safe";
            
            tableBody.innerHTML += `
                <tr>
                    <td>${s.name}</td>
                    <td>${s.attendance}%</td>
                    <td>${s.marks}</td>
                    <td class="${rowClass}">${s.status}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Page load aagumbodhu run aagum
window.onload = loadTable;
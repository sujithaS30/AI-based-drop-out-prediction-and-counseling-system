document.addEventListener("DOMContentLoaded", function () {
    
    // Global array to store fetched students
    let globalStudentsData = [];

    // 1. Sidebar Navigation Toggling Logic
    const navItems = document.querySelectorAll(".nav-item");
    const sections = document.querySelectorAll(".content-section");

    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
            sections.forEach(section => section.style.display = "none");

            const targetSectionId = this.getAttribute("data-target") + "-section";
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });

    // 2. Fetch Student Data and Populate All Tabs Dynamically
    async function fetchAndPopulateData() {
        const dashboardBody = document.getElementById("student-list");
        const recordsBody = document.getElementById("records-list");
        const alertsBody = document.getElementById("alerts-list");

        try {
            const response = await fetch('http://127.0.0.1:5000/students');
            globalStudentsData = await response.json();
            
            // Clear existing tables
            if(dashboardBody) dashboardBody.innerHTML = '';
            if(recordsBody) recordsBody.innerHTML = '';
            if(alertsBody) alertsBody.innerHTML = '';

            globalStudentsData.forEach(s => {
                const rowClass = s.status === "High Risk" ? "high-risk" : "safe";
                
                // TAB 1: Populate Dashboard
                if(dashboardBody) {
                    dashboardBody.innerHTML += `
                        <tr>
                            <td>${s.name}</td>
                            <td>${s.attendance}%</td>
                            <td>${s.marks}</td>
                            <td class="${rowClass}">${s.status}</td>
                        </tr>
                    `;
                }

                // TAB 2: Populate Student Records (With a Functional Edit/Action Button)
                if(recordsBody) {
                    recordsBody.innerHTML += `
                        <tr>
                            <td><strong>${s.name}</strong></td>
                            <td>${s.attendance}%</td>
                            <td>${s.marks}</td>
                            <td>
                                <button class="action-btn" data-id="${s.id}" data-name="${s.name}" style="background: #3498db; color: white; border:none; padding: 6px 12px; border-radius: 4px; cursor:pointer;">Update Counseling</button>
                            </td>
                        </tr>
                    `;
                }

                // TAB 3: Populate Risk Alerts (Only High Risk students filtered automatically)
                if(s.status === "High Risk" && alertsBody) {
                    alertsBody.innerHTML += `
                        <tr>
                            <td>${s.name}</td>
                            <td>${s.attendance}%</td>
                            <td>${s.marks}</td>
                            <td class="high-risk">${s.status}</td>
                        </tr>
                    `;
                }
            });

            // Attach dynamic event listeners to "Update Counseling" buttons
            attachCounselingListeners();

        } catch (error) {
            console.error("Error fetching data from API:", error);
        }
    }

    // 3. Counseling Event Listener Mapping
    function attachCounselingListeners() {
        const buttons = document.querySelectorAll(".action-btn");
        const formContainer = document.getElementById("counseling-form-container");
        const nameSpan = document.getElementById("selected-student-name");
        const idInput = document.getElementById("counseling-student-id");

        buttons.forEach(btn => {
            btn.addEventListener("click", function() {
                const studentId = this.getAttribute("data-id");
                const studentName = this.getAttribute("data-name");

                idInput.value = studentId;
                nameSpan.innerText = studentName;
                formContainer.style.display = "block";
                formContainer.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // 4. Handle Counseling POST Submit to Backend
    const saveBtn = document.getElementById("save-counseling-btn");
    if(saveBtn) {
        saveBtn.addEventListener("click", async function() {
            const studentId = document.getElementById("counseling-student-id").value;
            const cDate = document.getElementById("counseling-date").value;
            const cRemarks = document.getElementById("counseling-remarks").value;

            if(!cDate || !cRemarks) {
                alert("Please fill in both the Counseling Date and Remarks!");
                return;
            }

            const payload = {
                id: parseInt(studentId),
                date: cDate,
                remarks: cRemarks
            };

            try {
                const response = await fetch('http://127.0.0.1:5000/update_counseling', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                alert(result.message); // Will show "Counseling updated successfully!"
                
                // Reset fields and hide form
                document.getElementById("counseling-date").value = "";
                document.getElementById("counseling-remarks").value = "";
                document.getElementById("counseling-form-container").style.display = "none";
                
                // Refresh full data
                fetchAndPopulateData();

            } catch (error) {
                console.error("Error updating counseling:", error);
                alert("Failed to update data. Check backend console!");
            }
        });
    }

    // Run core data initialization on entry
    fetchAndPopulateData();
});
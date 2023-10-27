let editedIndex = null;

        // Function to add an expense
        function addExpense(description, amount, category) {
            const expense = {
                description,
                amount,
                category
            };
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            updateExpenseList();
        }

        // Function to update the list of expenses
        function updateExpenseList() {
            const expenseList = document.getElementById('expense-list');
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenseList.innerHTML = '';

            for (let i = 0; i < expenses.length; i++) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `${expenses[i].description}: ₹${expenses[i].amount} (${expenses[i].category}) 
                    <button class="btn btn-warning btn-sm" onclick="editExpense(${i})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense(${i})">Delete</button>`;
                expenseList.appendChild(listItem);
            }
        }

        // Function to edit an expense
        function editExpense(index) {
            editedIndex = index;
            const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            const expense = expenses[index];
            document.getElementById('description').value = expense.description;
            document.getElementById('amount').value = expense.amount;
            document.getElementById('category').value = expense.category;
        }

        // Function to save the edited expense
        document.getElementById('expense-form').addEventListener('submit', function (e) {
            e.preventDefault();
            const description = document.getElementById('description').value;
            const amount = document.getElementById('amount').value;
            const category = document.getElementById('category').value;

            if (editedIndex !== null && description && amount) {
                let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
                expenses[editedIndex].description = description;
                expenses[editedIndex].amount = amount;
                expenses[editedIndex].category = category;
                localStorage.setItem('expenses', JSON.stringify(expenses));
                editedIndex = null;
                document.getElementById('description').value = '';
                document.getElementById('amount').value = '';
                document.getElementById('category').value = 'food';
                updateExpenseList();
            } else {
                addExpense(description, amount, category);
                document.getElementById('description').value = '';
                document.getElementById('amount').value = '';
                document.getElementById('category').value = 'food';
            }
        });

        // Function to delete an expense
        function deleteExpense(index) {
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            updateExpenseList();
        }

        // Initialize the app
        updateExpenseList();
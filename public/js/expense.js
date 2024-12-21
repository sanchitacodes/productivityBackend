let expenses = [];
let totalAmount = 0;
let cashIn = 0;
let remainingMoney = 0;

const categoryInput = document.getElementById('category-input');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addbtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const cashInInput = document.getElementById('cash-in-input');
const cashInBtn = document.getElementById('cash-in-btn');
const remainingMoneyDisplay = document.getElementById('remaining-money');

cashInBtn.addEventListener('click', function () {
    const cashAmount = Number(cashInInput.value);

    if (isNaN(cashAmount) || cashAmount <= 0) {
        alert("Please enter a valid samount.");
        return;
    }

    cashIn += cashAmount;
    remainingMoney = cashIn - totalAmount;
    updateRemainingMoney();

    // Clear input
    cashInInput.value = '';
});


addbtn.addEventListener('click', function() {
    // const category = categorySelect.value;
    const category = categoryInput.value.trim();
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    if(category === ''){
        alert('Please select a category');
        return;
    }
    if(isNaN(amount) || amount<=0){
        alert('Please enter a valid amount');
        return;
    }
    if(date===''){
        alert('Please enter a date');
        return;
    }
    const expense={category, amount, date};
    expenses.push(expense);
    totalAmount += amount;
    remainingMoney -=amount;
    totalAmountCell.textContent = totalAmount;
    updateRemainingMoney();

    const newRow = expensesTableBody.insertRow();
    const categoryCell1 = newRow.insertCell();
    const amountCell1 = newRow.insertCell();
    const dateCell1 = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell1.textContent = expense.category;
    amountCell1.textContent = expense.amount.toFixed(2);
    dateCell1.textContent = expense.date;


    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        remainingMoney += expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.removeChild(newRow);
        // remainingMoney -= totalAmount;
        updateRemainingMoney();
    });
   
    deleteCell.appendChild(deleteBtn);
    categoryInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
});

function updateRemainingMoney() {
    remainingMoneyDisplay.textContent = remainingMoney.toFixed(2);

    // Reset cash in if no money is left
    if (remainingMoney <= 0) {
        alert("No money left. Cash In is reset to 0.");
        cashIn = 0;
        remainingMoney = 0;
        remainingMoneyDisplay.textContent = remainingMoney.toFixed(2);
    }
}
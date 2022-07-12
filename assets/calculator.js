// Make Variabel
const calculator = {
    displayNumber           : '0',
    firstNumber             : null,
    secondNumber            : null,
    operator                : null,
    waitingForSecondNumber  : false,
};

// subDisplay dalam menampilkan operasi yang sedang berjalan
function updateSubDisplay() {

    if ((calculator.operator != null) && (calculator.firstNumber != null) && (calculator.secondNumber != null)) {
        document.getElementById('subDisplayNumber').innerText = calculator.firstNumber + " " + calculator.operator + " " + calculator.secondNumber + " = " + calculator.displayNumber;
    } else if ((calculator.operator != null) && (calculator.firstNumber != null)) {
        document.getElementById('subDisplayNumber').innerText = calculator.firstNumber + " " + calculator.operator + " " + calculator.displayNumber;
    } else {
        document.getElementById('subDisplayNumber').innerText = calculator.displayNumber;
    } 
  
}

// update display
function updateDisplay() {
    document.getElementById('displayNumber').innerText = calculator.displayNumber;
}

// Just Delete a Line
function clearLine() {
    calculator.displayNumber = '0';
} 

// set variabel to default
function clearAllCalculator() {
    calculator.displayNumber            = '0';
    calculator.firstNumber              = null;
    calculator.secondNumber             = null;
    calculator.operator                 = null;
    calculator.waitingForSecondNumber   = false;
}

// backspace Button
function backspace() {

    if (calculator.displayNumber === '0') {
        return;
    } 

    // Delete last character at string
    calculator.displayNumber = calculator.displayNumber.slice(0, calculator.displayNumber.length - 1);

    // if string is empty then set to 0 
    if (calculator.displayNumber === '') {

        calculator.displayNumber = '0';
        
    }
}

// Input Digit, the parameter is String
function inputDigit(digit) {

    if (calculator.displayNumber === '0') {

        calculator.displayNumber = digit;
    
    } else {
    
        calculator.displayNumber += digit;
    
    }
}

// Negative Operator
function negativeNumber() {

    // is displayNumber equals to '0'?
    if (calculator.displayNumber === '0') {
        return;
    }

    // After This line, calculator.displayNumber become a Number(Type Data)
    calculator.displayNumber = calculator.displayNumber * -1;

}

// Handle for button Operator (/, *, -, +)
function handleOperator(operator) {

    // Apabila nilai variabel waitingForSecondNumber bernilai false
    // maka kondisi if dijalankan
    if(!calculator.waitingForSecondNumber) {

        calculator.firstNumber              = calculator.displayNumber;
        calculator.waitingForSecondNumber   = true;
        calculator.operator                 = operator;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber            = '0';

    } else {

        alert('Operator ' + calculator.operator + ' Sudah Anda Tetapkan');

    }
}

function performCalculation() {

    // Apabila operator belum diisi angka maka ini dijalankan
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    calculator.secondNumber = parseInt(calculator.displayNumber);

    // Make variable with Number type data
    let result = 0;

    if (calculator.operator === '÷'){
    
        result = parseInt(calculator.firstNumber) / calculator.secondNumber; 
    
    } else if (calculator.operator === '×') {

        result = parseInt(calculator.firstNumber) * calculator.secondNumber;

    } else if (calculator.operator === '−') {

        result = parseInt(calculator.firstNumber) - calculator.secondNumber;

    } else if (calculator.operator === '+') {
        
        result = parseInt(calculator.firstNumber) + calculator.secondNumber;

    } else if (calculator.operator === '%') {
        
        result = parseInt(calculator.firstNumber) % calculator.secondNumber;

    }

    calculator.displayNumber = result;

}



// Put all element by class button
const buttons = document.getElementsByClassName('button');

for (const button of buttons) {

    // Button On Click
    button.addEventListener('click', function(event) {

        // Object Type Data from Event click
        const target = event.target;

        // CE Button
        if(target.classList.contains('clear-line')){
            clearLine();
            updateSubDisplay();
            updateDisplay();
            return;
        }

        // C Button
        if(target.classList.contains('clear-all')){
            clearAllCalculator();
            updateSubDisplay();
            updateDisplay();
            return;
        }

        // Backspace Button
        if(target.classList.contains('backspace')){
            backspace();
            updateSubDisplay();
            updateDisplay();
            return;
        }

        // Negative/Positif Button
        if(target.classList.contains('negative')){
            negativeNumber();
            updateSubDisplay();
            updateDisplay();
            return;
        }

        // Operator Button
        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            updateSubDisplay();
            updateDisplay();
            return;
        }

        // Equals Button
        if(target.classList.contains('equals')){
            performCalculation();
            updateSubDisplay();
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);

        updateSubDisplay();
        updateDisplay();
        

    });
}
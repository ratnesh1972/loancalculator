//UI Variables
let form = document.querySelector('#loan-form');
let reset = document.querySelector('#reset');

let loan_amount = document.querySelector('#amount');
let interest = document.querySelector('#interest');
let years = document.querySelector('#years');

let monthly_payment = document.querySelector('#monthly-payment');
let yearly_payment = document.querySelector('#yearly-payment');
let total_amount = document.querySelector('#total-amount');

form.addEventListener('submit', function (e) {
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loader').style.display = 'block';
    //Call calculateResults after 1.5sec
    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

function calculateResults() {
    //principal, interest and years values
    const principal = parseFloat(loan_amount.value);
    const rate = parseFloat(interest.value);
    const time = parseFloat(years.value);

    //Calculations
    let total = principal * rate * time / 100;
    let final_amount = principal + total;
    let yearly = final_amount / time;
    let monthly = yearly / 12;

    //Set the values in UI
    if (isFinite(monthly)) {
        monthly_payment.value = monthly.toFixed(2);
        yearly_payment.value = yearly.toFixed(2);
        total_amount.value = total.toFixed(2);
        //Hide Results
        document.getElementById('results').style.display = 'block';
        //Show Loader
        document.getElementById('loader').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

function showError(err) {
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loader').style.display = 'none';
    //create a div
    let errDiv = document.createElement('div');
    //add classname
    errDiv.className = 'alert alert-danger';
    // add textNode
    errDiv.appendChild(document.createTextNode(err));
    //append to card top
    let card = document.querySelector('.card-body');
    let heading = document.querySelector('.card-title');

    card.insertBefore(errDiv, heading);


    //clear Error after 3 sec
    setTimeout(clearError, 3000);

}

function clearError() {
    document.querySelector('.alert').remove();
}

reset.addEventListener('click', function () {
    //Reset Results 
    monthly_payment.value = "";
    yearly_payment.value = "";
    total_amount.value = "";

    //Hide Results
    document.getElementById('results').style.display = 'none';

    //Reset Form
    form.reset();
})
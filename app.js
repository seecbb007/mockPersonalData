//npm i nodemon
import { mockPersonalData } from "./mockData.js";

//Personal Information

const getCustomerInfo = () => {
  return mockPersonalData.mortgageApplication.customerInfo;
};
const customerInfo = getCustomerInfo();

//Income Calculation:

//1. Latest 1-month paystub
const getCustomerPaystub = () => {
  return mockPersonalData.mortgageApplication.paystub;
};
const customerPaystub = getCustomerPaystub();

//-How to check this is biweekly paystub && calculate the monthly income

function calculateMonthlyIncome(customerPaystub) {
  const { payPeriod, hourlyRate, grossIncome, netIncome, workedHour } =
    customerPaystub;

  const [startDateStr, endDateStr] = payPeriod.split(" - ");
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  // Calculate the difference in days between the start and end dates
  const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);

  if (dayDifference >= 13 && dayDifference <= 15 && hourlyRate) {
    const monthlyGrossIncome = (hourlyRate * workedHour * 52) / 12; // working 40 hour per week for 52 weeks
    return monthlyGrossIncome;
  } else if (dayDifference >= 13 && dayDifference <= 15) {
    const monthlyGrossIncome = grossIncome * 2;
    return monthlyGrossIncome;
  } else if (dayDifference > 15 && dayDifference <= 31) {
    const monthlyGrossIncome = grossIncome;
    return monthlyGrossIncome;
  } else {
    console.log("Wrong Pay Period");
    return -1;
  }
}

calculateMonthlyIncome(customerPaystub);

//2. Latest year w-2

function calculateMonthlyIncomeFromW2s(w2s) {
  // Sum the grossIncome from all W-2 forms
  const totalAnnualIncome = w2s.reduce(
    (total, w2) => total + w2.grossIncome,
    0
  );

  // Calculate and return the monthly income
  return totalAnnualIncome / 12;
}
//Test DATA
// const monthlyIncome = calculateMonthlyIncomeFromW2s(
//   mockPersonalData.mortgageApplication.w2s
// );
//console.log(monthlyIncome);

//3. Latest year federal tax return
//The reason why we receive a federal tax return is to review the list of properties for investment houses, self-employed income, or other income that the lender needs to examine.

//Debts Calculation
//1.  Latest 1 month all property mortgage statement

//Need to make sure there is no past due amount showed in the monthly mortgage statement

function calculateTotalMortgagePayment(housingExpenses) {
  return housingExpenses.reduce(
    (total, expense) => total + expense.mortgagePayment,
    0
  );
}

//Test
// const housingExpenseInfo =
//   mockPersonalData.mortgageApplication.debtInfo.housingExpense;
// const totalMortgagePayment = calculateTotalMortgagePayment(housingExpenseInfo);
// console.log(
//   `The total mortgage payment for all properties is: $${totalMortgagePayment}`
// );

//2. All properties home insurance statement

//Each properties monthly home insurance payment
function calculateMonthlyHomeInsurancePayments(housingExpenses) {
  housingExpenses.forEach((expense) => {
    const monthlyInsurance = expense.insurance / 12;
    // console.log(
    //   `Monthly insurance payment for ${
    //     expense.address.street
    //   }: $${monthlyInsurance.toFixed(1)}`
    // );
  });
}

calculateMonthlyHomeInsurancePayments(
  mockPersonalData.mortgageApplication.debtInfo.housingExpense
);

//Sum of the monthly insurance payment
function sumMonthlyHomeInsurancePayments(housingExpenses) {
  const totalMonthlyInsurance = housingExpenses.reduce((sum, expense) => {
    return sum + expense.insurance / 12;
  }, 0);

  return totalMonthlyInsurance;
}

const totalMonthlyInsurancePayment = sumMonthlyHomeInsurancePayments(
  mockPersonalData.mortgageApplication.debtInfo.housingExpense
);
// console.log(
//   `Total monthly insurance payment for all properties: $${totalMonthlyInsurancePayment.toFixed(
//     1
//   )}`
// );

//3. All properties HOA Bill
//Normally, the HOA bill is a monthly bill.
function calculateTotalHOABill(housingExpenses) {
  const totalHOA = housingExpenses.reduce(
    (sum, expense) => sum + expense.hoa,
    0
  );
  return totalHOA;
}

const totalHOABill = calculateTotalHOABill(
  mockPersonalData.mortgageApplication.debtInfo.housingExpense
);
//console.log(`Total monthly HOA bill for all properties: $${totalHOABill}`);

//4. HELOC statement
function calculateTotalHelocBill(housingExpenses) {
  const totalHeloc = housingExpenses.reduce(
    (sum, expense) => sum + expense.heloc,
    0
  );
  return totalHeloc;
}

const totalhelocBill = calculateTotalHelocBill(
  mockPersonalData.mortgageApplication.debtInfo.housingExpense
);
//console.log(`Total monthly HELOC bill for all properties: $${totalhelocBill}`);

//5. Base on credit report, monthly credit card payment
//If the monthly credit card payment is under $50, it can be omitted.
function calculateTotalCreditReportPayments(creditReport) {
  const totalPayment = creditReport
    .filter((payment) => payment.monthlyPayment >= 50)
    .reduce((sum, { monthlyPayment }) => sum + monthlyPayment, 0);
  return totalPayment;
}

const totalPayments = calculateTotalCreditReportPayments(
  mockPersonalData.mortgageApplication.debtInfo.creditReport
);
// console.log(
//   `Total monthly payments (excluding payments < $50): $${totalPayments}`
// );

//Assets Calculation

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
//console.log("AAA", customerPaystub);
// //-How to check this is biweekly paystub && calculate the monthly income

function calculateMonthlyIncomeFromMostRecentPaystub(paystubs) {
  if (paystubs.length === 0) {
    console.log("No paystubs provided");
    return -1;
  }

  // Assuming paystubs are sorted by date, with the most recent last. If not, you'll need to sort them.
  const mostRecentPaystub = paystubs[paystubs.length - 1];
  const { payPeriod, hourlyRate, grossIncome, netIncome, workedHour } =
    mostRecentPaystub;

  const [startDateStr, endDateStr] = payPeriod.split(" - ");
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  // Calculate the difference in days between the start and end dates
  const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24); // +1 to include the end date

  // Adjust the conditions and calculations according to the updated logic for handling multiple paystubs
  if (dayDifference >= 13 && dayDifference <= 15) {
    // Biweekly paystub
    if (hourlyRate && workedHour) {
      return (hourlyRate * workedHour * 52) / 12; // For hourly employees
    } else {
      return grossIncome * 2; // Assuming 2 pay periods per month
    }
  } else if (dayDifference >= 28 && dayDifference <= 31) {
    // Monthly paystub
    return grossIncome; // Use the gross income directly for monthly paystubs
  } else {
    console.log("Pay period does not match expected ranges");
    return -1;
  }
}

// Example usage with the updated paystub array
// const monthlyIncome = calculateMonthlyIncomeFromMostRecentPaystub(
//   mockPersonalData.mortgageApplication.paystub
// );
// console.log(monthlyIncome);

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

//3.Latest year federal tax return
//The reason why we receive a federal tax return is to review the list of properties for investment houses, self-employed income, or other income that the lender needs to examine.

//4.Using Year-end Paystub to calculate bonus/ comission/ overtime

// OVERTIME
function calculateMonthlyOvertimeIncome(yearEndPayStubs) {
  // Sort the paystubs by pay period to ensure we're working with the most recent entries
  const sortedPayStubs = yearEndPayStubs.sort(
    (a, b) =>
      new Date(a.payPeriod.split(" - ")[1]) -
      new Date(b.payPeriod.split(" - ")[1])
  );

  // Take the last two entries for the most recent two years
  const recentYearStubs = sortedPayStubs.slice(-2);

  // Calculate the total yearToDateOvertime from the most recent two entries
  const totalYearToDateOvertime = recentYearStubs.reduce(
    (total, stub) => total + (stub.yearToDateOvertime || 0),
    0
  );

  // Use the overtime rate from the most recent entry
  const overtimeRate = recentYearStubs[recentYearStubs.length - 1].overtimeRate;

  // Calculate the total overtime income and then divide by 12 for the monthly income
  const totalOvertimeIncome = totalYearToDateOvertime * overtimeRate;
  const monthlyOvertimeIncome = totalOvertimeIncome / 12;

  return monthlyOvertimeIncome.toFixed(0);
}

// Assuming mockPersonalData is defined as per your structure
// const yearEndPayStubs = mockPersonalData.mortgageApplication.yearEndPayStub;
// const monthlyOvertimeIncome = calculateMonthlyOvertimeIncome(yearEndPayStubs);
// console.log(monthlyOvertimeIncome);

//Comission
function calculateEachYearEndPayStubMonthlyComission(yearEndPayStubs) {
  return yearEndPayStubs.map((com) => {
    const yearlyComission = com.commission || 0; // Default to 0 if not present
    const monthlyComission = Math.round((yearlyComission / 12) * 10) / 10; // Calculate and round to one decimal point
    return {
      documentId: com.documentId, // Include documentId to identify the paystub
      monthlyComission,
    };
  });
}

//MOCK DATA Console
// const monthlyComission = calculateEachYearEndPayStubMonthlyComission(
//   mockPersonalData.mortgageApplication.yearEndPayStub
// );
// console.log(monthlyComission);

//  Bonus

function calculateEachYearEndPayStubMonthlyBonus(yearEndPayStubs) {
  return yearEndPayStubs.map((stub) => {
    const yearlyBonus = stub.bonus || 0; // Default to 0 if not present
    const monthlyBonus = Math.round((yearlyBonus / 12) * 10) / 10; // Calculate and round to one decimal point
    return {
      documentId: stub.documentId, // Include documentId to identify the paystub
      monthlyBonus,
    };
  });
}

//MOCK DATA Console
// const monthlyBonuses = calculateEachYearEndPayStubMonthlyBonus(
//   mockPersonalData.mortgageApplication.yearEndPayStub
// );
// console.log(monthlyBonuses);

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

//Check Bank Statement Period
function checkEachBankStatementsLastTwoMonths(
  bankStatements,
  simulatedCurrentDate = "2024-03-01"
) {
  const currentDate = new Date(simulatedCurrentDate);
  const twoMonthsAgoDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 2,
    1
  );

  const bankChecks = {};

  Object.entries(bankStatements).forEach(([bankName, statements]) => {
    // Assume true until a statement not in the last two months is found
    let allFromLastTwoMonths = true;

    statements.forEach(({ statementPeriod }) => {
      const [, endDateStr] = statementPeriod.split(" - ");
      const endDate = new Date(endDateStr);

      if (endDate < twoMonthsAgoDate) {
        allFromLastTwoMonths = false;
      }
    });

    bankChecks[bankName] = allFromLastTwoMonths;
  });

  return bankChecks;
}
const result = checkEachBankStatementsLastTwoMonths(
  mockPersonalData.mortgageApplication.bankStatements
);
//console.log("Bank Statement Period", result);

// --- How to make sure the borrower name showed in the bankStatements accountholder name?

function validateBorrowerNameByBank(bankStatements, customerInfo) {
  const fullName = `${customerInfo.firstName} ${customerInfo.lastName}`;
  const bankNameResults = {};

  Object.entries(bankStatements).forEach(([bankName, statements]) => {
    // Check each statement in the current bank for a matching name
    const allNamesMatch = statements.every(
      (statement) => statement.accountHolder === fullName
    );
    bankNameResults[bankName] = allNamesMatch;
  });

  return bankNameResults;
}
const nameMatchResults = validateBorrowerNameByBank(
  mockPersonalData.mortgageApplication.bankStatements,
  mockPersonalData.mortgageApplication.customerInfo
);

//console.log("Account Holder", nameMatchResults);

//--- How to make sure there is no more than one large deposit, more than 10000, in the bank statement transaction
// Need to analyze the whole bank statement transaction

//Make sure same Bank Name

function validateConsistencyOfBankNames(bankStatements) {
  const consistencyResults = {};

  Object.entries(bankStatements).forEach(([bankKey, statements]) => {
    // Assuming there's at least one statement per bank, use the first statement's bankName as the reference.
    if (statements.length === 0) {
      // If there are no statements for a bank, you might want to handle this case differently.
      // For now, let's assume it's consistent by default (or mark as 'No Statements' for clarity).
      consistencyResults[bankKey] = "No Statements";
      return;
    }

    const referenceBankName = statements[0].bankName;
    const allMatch = statements.every(
      (statement) => statement.bankName === referenceBankName
    );
    consistencyResults[bankKey] = allMatch;
  });

  return consistencyResults;
}

const consistencyCheckResults = validateConsistencyOfBankNames(
  mockPersonalData.mortgageApplication.bankStatements
);
//console.log("Bank Name?", consistencyCheckResults);

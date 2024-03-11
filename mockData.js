export const mockPersonalData = {
  mortgageApplication: {
    customerInfo: {
      firstName: "John",
      lastName: "Doe",
      ssn: "***-**-1234",
      dateOfBirth: "1990-01-01",
      phoneNumber: "555-555-1234",
      email: "johndoe@example.com",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zipCode: "12345",
      },
    },
    paystub: {
      documentId: "paystub1",
      employerName: "XYZ Corp",
      employerAddress: {
        street: "456 Market St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94102",
      },
      payPeriod: "2022-01-01 - 2022-01-15",
      grossIncome: 5000,
      netIncome: 4000,
      yearToDateIncome: 10000,
      base64EncodedFile:
        "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
    },
    // paystubs: [
    //   {
    //     documentId: "paystub1",
    //     employerName: "XYZ Corp",
    //     employerAddress: {
    //       street: "456 Market St",
    //       city: "San Francisco",
    //       state: "CA",
    //       zipCode: "94102",
    //     },
    //     payPeriod: "2022-01-01 - 2022-01-15",
    //     grossIncome: 5000,
    //     netIncome: 4000,
    //     yearToDateIncome: 10000,
    //     base64EncodedFile:
    //       "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
    //   },
    //   {
    //     documentId: "paystub2",
    //     employerName: "ABC Inc",
    //     employerAddress: {
    //       street: "789 Mission St",
    //       city: "San Francisco",
    //       state: "CA",
    //       zipCode: "94103",
    //     },
    //     payPeriod: "2022-01-16 - 2022-01-31",
    //     grossIncome: 5000,
    //     netIncome: 4000,
    //     yearToDateIncome: 20000,
    //     base64EncodedFile:
    //       "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
    //   },
    // ],
    w2s: [
      {
        documentId: "w2_2021",
        year: 2021,
        employerName: "XYZ Corp",
        employerAddress: {
          street: "456 Market St",
          city: "San Francisco",
          state: "CA",
          zipCode: "94102",
        },
        grossIncome: 60000,
        federalTaxWithheld: 12000,
        stateTaxWithheld: 3000,
        base64EncodedFile:
          "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
      },
    ],
    incomeInfo: {
      employmentStatus: "Full-time",
      employmentHistory: [
        {
          employerName: "XYZ Corp",
          position: "Software Engineer",
          startDate: "2019-01-01",
          endDate: "Present",
        },
        {
          employerName: "ABC Inc",
          position: "Junior Software Engineer",
          startDate: "2017-01-01",
          endDate: "2018-12-31",
        },
      ],
      additionalIncome: [
        {
          source: "Rental Income",
          amount: 1000,
          frequency: "Monthly",
        },
      ],
    },
    debtInfo: {
      creditReport: [
        {
          creditorName: "Credit Card Company",
          accountNumber: "****1234",
          monthlyPayment: 80,
          balance: 3000,
        },
        {
          creditorName: "Credit Card Company",
          accountNumber: "****12345",
          monthlyPayment: 25,
          balance: 1000,
        },
        {
          creditorName: "Student Loan Servicer",
          accountNumber: "****5678",
          monthlyPayment: 400,
          balance: 20000,
        },
        {
          creditorName: "Auto Loan Servicer",
          accountNumber: "****5600",
          monthlyPayment: 500,
          balance: 10000,
        },
      ],
      housingExpense: [
        {
          address: {
            street: "567 Main St",
            city: "Anytown",
            state: "CA",
            zipCode: "12346",
          },
          insurance: 800,
          mortgagePayment: 2000,
          hoa: 200,
          heloc: 0,
          occupancy: "investment",
        },
        {
          address: {
            street: "568 Main St",
            city: "Anytown",
            state: "CA",
            zipCode: "54008",
          },
          insurance: 700,
          mortgagePayment: 1000,
          hoa: 0,
          heloc: 600,
          occupancy: "primary",
        },
      ],
    },
    bankStatements: {
      bank1: [
        {
          accountHolder: "John Doe",
          documentId: "bank_statement_jan_2022",
          accountNumber: "****1234",
          bankName: "Big Bank",
          statementPeriod: "2023-11-01 - 2023-11-31",
          openingBalance: 10000,
          closingBalance: 12000,
          base64EncodedFile:
            "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
        },
        {
          accountHolder: "John Doe",
          documentId: "bank_statement_feb_2022",
          accountNumber: "****1234",
          bankName: "Big Bank",
          statementPeriod: "2024-02-01 - 2024-02-28",
          openingBalance: 12000,
          closingBalance: 20000,
          base64EncodedFile:
            "JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
        },
      ],
      bank2: [
        {
          accountHolder: "John Doe",
          documentId: "bank_statement_jan_2022",
          accountNumber: "****4567",
          bankName: "Small Bank",
          statementPeriod: "2024-01-01 - 2024-01-31",
          openingBalance: 10000,
          closingBalance: 30000,
          base64EncodedFile:
            "BERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
        },
        {
          accountHolder: "John Doe",
          documentId: "bank_statement_feb_2022",
          accountNumber: "****4567",
          bankName: "Small Bank",
          statementPeriod: "2024-02-01 - 2024-02-28",
          openingBalance: 30000,
          closingBalance: 35000,
          base64EncodedFile:
            "BERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSPj4Kc3RyZWFtCkJUCjAgMCBUZAovRjEgMTIgVGYKKC4uLlR4dC4uLikKRVQKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iagozOTAKZW5kb2JqCg==",
        },
      ],
    },
  },
};

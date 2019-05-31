import React from "react";

class Results extends React.Component {
  render() {
    const {
      interestRate,
      monthlyAmount,
      monthlyCurrency,
      numMonths,
      numPayments,
      principal
    } = this.props.interestOutputs;
    return (
      <>
        <div>
          <p className="item">
            Loan Amount:<b>{principal}</b>
          </p>
          <p className="item">
            Loan Duration:<b>{numMonths}</b>
          </p>
          <p className="item">
            Interest Rate: <b>{interestRate}</b>
          </p>
          <p className="item">
            Monthly Amount:
            <b>
              {monthlyAmount} {monthlyCurrency}
            </b>
          </p>
          <p className="item">
            Total Number of Payments: <b>{numPayments}</b>
          </p>
        </div>
      </>
    );
  }
}

export default Results;
import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

class SimulationPage extends Component {
  constructor() {
    super();
    this.state = {
      amount: '',
      //interest: '',
      yearsToPay: '',
      totalMonthly: '',
      totalPayment: '',
      totalInterest: ''
      
    };
  }

  handleChange = (e) => {
    //get a reference to the name and value
    let { name, value} = e.target;
    console.log(name);
    console.log(value);
    //update the state for the name with the value input
    this.setState({[name]: value });
  }

  handleSubmit = (event) => {
    const { amount, interest, yearsToPay } = this.state;
    event.preventDefault();
    console.log('a submit request was sent');
    //handle submit to a blank form
    if (amount === '' || yearsToPay === '') {
      this.setState({
        // error: !error,
      });
    } else {
      //calculate the total payments
      //console.log(`before parse - amount${amount} - interest${interest} -yearstopay${yearsToPay}`);
      const principal = parseFloat(amount);
      //const calculatedInterest = parseFloat(interest) / 100 ;
      const calculatedPayments = parseFloat(yearsToPay);
      console.log(principal);
      //console.log(calculatedInterest);
      console.log(calculatedPayments);
      const total = this.monthlyPayment(principal, calculatedPayments);
      console.log(total);

    }
  }

  //compute monthly payment
  monthlyPayment = (principal,  calculatedPayments) => {
    //calculate the 
    const x = Math.pow(1 + calculatedPayments);
    //calculate total monthly payment
    const monthly = ((principal +principal* 2* 0.01));
    //calculate total interest
    const totalint = (((principal +principal* 2* 0.01)-principal)  * 0.1);
    //calculate total payment
    const totalpay = ((principal +principal* 2* 0.01)-(((principal +principal* 2* 0.01)-principal)  * 0.1));
    //update the state with the calculated monthly, interest and payment information
    this.setState({
      totalMonthly: monthly,
      totalInterest: totalint,
      totalPayment: totalpay
      
    });
  };

  render() {
    const { amount, yearsToPay, totalMonthly, totalInterest, totalPayment, error } = this.state;
    return (
      
      <Col xl={6} lg={12} md={12}>
          <div className="card card-body textcenter mt-5">
            {/* {!error ? null : <ErrorMessage />} */}
            <h1 className="heading display-5 pb-3">Simulateur DATs</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$ Montant</span>
                </div>
                <input
                  placeholder="Montant du DAT" 
                  name="amount"
                  value={amount}
                  onChange={this.handleChange}
                  type="number"
                  className="form-control" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">% Interet</span>
                </div>
                <input
                  name="interest"
                  //value={interest}
                  //onChange={this.handleChange}
                  type="number" 
                  className="form-control" 
                  placeholder="2" disabled/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Durée en mois</span>
                </div>
                <input 
                  name="yearsToPay"
                  value={yearsToPay}
                  onChange={this.handleChange}
                  type="number"
                  className="form-control"
                  placeholder="Durée du DAT" />
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-dark btn-block" />
              </div>
            </form>
           
        <div id="pt5">
            <h5>Résultats</h5>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Intérêts nets (MAD/devise).
                        </span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        value={totalMonthly}
                        disabled />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Montant total</span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        value={totalPayment}
                        disabled />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Taxe sur intérêts (%) </span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        value={totalInterest}
                        disabled />
                </div>
            </div>
        </div>
          </div>
        </Col>
        
      
    );
  }
}

export default SimulationPage;
 
import Page from 'components/Page';
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
class ComptePage extends Component {
  
  
  state = {
    compte: [],
    newdatData: {
      
      nom: '',
      prénom:'',
      solde:'',
      num_compte: ''
    },
   
    newdatModal: false,
  }
  componentWillMount() {
    this._refreshdat();
  }
  toggleNewdatModal() {
    this.setState({
      newdatModal: ! this.state.newdatModal
    });
  }
 
  adddat() {
    axios.post('http://localhost:8080/api/compte', this.state.newdatData).then((response) => {
      console.log(response);
    /*let { dat } = this.state;

      dat.push(response.data);

      this.setState({ dat, newdatModal: false, newdatData: {
        
      contrat: '',client: '',tarification:'' ,devise:'',
      datecreation:'',
     

role: '',raison: ''
  }});*/

    });
  }
  
  
  deletedat(contrat) {
    axios.delete('http://localhost:8080/api/dat/${contrat}' + contrat).then((response) => {
      this._refreshdat();
    });
  }
  //recuperer data
  _refreshdat() {
    axios.get('http://localhost:8080/api/compte').then((response) => {
      this.setState({
        compte: response.data
      })
    });
  }
  render() {
    let compte = this.state.compte.map((compte) => {
      return (
        <tr key={compte.id}>
          <td>{compte.nom}</td>
          <td>{compte.prénom}</td>
           <td>{compte.solde}</td>
               
         
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Mon compte</h1>

      

      

        <Table>
          <thead>
            <tr>
              <th>Nom</th>                  
              <th>Prénom</th>  
              <th>Solde</th>
              

            
            </tr>
          </thead>

          <tbody>
            {compte}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ComptePage;


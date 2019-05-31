import Page from 'components/Page';
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
class SouscriptionPage extends Component {
  
  
  state = {
    dat: [],
    newdatData: {
      client: '',
      contrat: '',
      datecreation:'',
      devise:'',
raison: '',
role: '',
tarification:''
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
    axios.post('http://localhost:8080/api', this.state.newdatData).then((response) => {
      let { dat } = this.state;

      dat.push(response.data);

      this.setState({ dat, newdatModal: false, newdatData: {
        
      contrat: '',client: '',tarification:'' ,devise:'',
      datecreation:'',
     

role: '',raison: ''
}});
    });
  }
  
  
  deletedat(contrat) {
    axios.delete('http://localhost:8080/api/dat/${contrat}' + contrat).then((response) => {
      this._refreshdat();
    });
  }
  _refreshdat() {
    axios.get('http://localhost:8080/api/dat').then((response) => {
      this.setState({
        dat: response.data
      })
    });
  }
  render() {
    let dat = this.state.dat.map((dat) => {
      return (
        <tr key={dat.contrat}>
          <td>{dat.contrat}</td>
          <td>{dat.client}</td>
           <td>{dat.tarification}</td>
           <td>{dat.devise}</td>
          <td>{dat.datecreation}</td>
          <td>{dat.role}</td>

          <td>{dat.raison}</td>
         
          <td>
            <Button color="danger" size="sm" onClick={this.deletedat.bind(this, dat.contrat)}>Annuler</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Souscription</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewdatModal.bind(this)}>Ajouter un dat</Button>

      <Modal isOpen={this.state.newdatModal} toggle={this.toggleNewdatModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewdatModal.bind(this)}>Add a new dat</ModalHeader>
        <ModalBody>
        <Row>
      <Col xl={6} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form>
          <FormGroup>
            <Label for="title">Contrat</Label>
            <Input contrat="contrat" value={this.state.newdatData.contrat} onChange={(e) => {
              let { newdatData } = this.state;

              newdatData.contrat = e.target.value;

              this.setState({ newdatData });
            }} />
          </FormGroup>
          
          
                <FormGroup>
                  <Label for="exampleNumber">client</Label>
                  <Input
                    type="text" value={this.state.newdatData.client} onChange={(e) => {
                      let { newdatData } = this.state;
        
                      newdatData.client = e.target.value;
        
                      this.setState({ newdatData });
                    }} />              
                </FormGroup>
               <FormGroup>
                  <Label for="exampleNumber">Tarification</Label>
                  <Input
                    type="number"
                    name="number"
                    value={this.state.newdatData.tarification} onChange={(e) => {
                      let { newdatData } = this.state;
        
                      newdatData.tarification = e.target.value;
        
                      this.setState({ newdatData });
                    }}  placeholder="Le montant souhaitable"

                  />
                </FormGroup>
               
                
                
                <FormGroup>
                  <Label for="exampleDate">Date de création</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate" value={this.state.newdatData.datecreation} onChange={(e) => {
                      let { newdatData } = this.state;
        
                      newdatData.datecreation = e.target.value;
        
                      this.setState({ newdatData });
                    }} />
                  
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Role</Label>
                  <Input type="select" name="select"  value={this.state.newdatData.role} onChange={(e) => {
              let { newdatData } = this.state;

              newdatData.role = e.target.value;

              this.setState({ newdatData });
            }} >
                    <option>titulaire</option>
                    <option>procuration</option>
                    <option>associé</option>
                    <option>tuteur</option>
                    <option>administrateur</option>
</Input>
                    
                 
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Variation</Label>
                  <Input type="text" name="text" 
                  placeholder="Chargé au service clientèle" disabled
/></FormGroup>
</Form>
</CardBody>
</Card>
</Col>
        <Col xl={6} lg={12} md={12}>
        <Card>
        <CardBody>
        <Form>
                <FormGroup row>

                  
                
                
                  <Label for="exampleText">Barème</Label>
                  <Input type="text" name="text" 
                   placeholder="Chargé au service clientèle" disabled
                  />
                </FormGroup>
              
    
              
                <FormGroup>
                  <Label for="exampleSelect">Produit</Label>
                  <Input type="select" name="select" >
                    <option>DAT STANDARD</option>
                   
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Devise</Label>
                  <Input type="select" name="select" value={this.state.newdatData.devise} onChange={(e) => {
              let { newdatData } = this.state;

              newdatData.devise = e.target.value;

              this.setState({ newdatData });
            }}  >
                    <option>MAD</option>
                    <option>EURO</option>
                    <option>DOLLAR</option>
                    
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Raison</Label>
                  <Input type="textarea" name="text" value={this.state.newdatData.raison} onChange={(e) => {
              let { newdatData } = this.state;

              newdatData.raison = e.target.value;

              this.setState({ newdatData });
            }} />
                </FormGroup>
                
                
               
              </Form>
              </CardBody>
             
</Card>        
        </Col>      
      </Row> 


        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.adddat.bind(this)}>Add dat</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewdatModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      

        <Table>
          <thead>
            <tr>
              <th>Contrat</th>                  
              <th>CLient</th>  
              <th>Tarification</th>
              <th>Devise</th>
              <th>Date de création</th>
              <th>Role</th>
              <th>Raison</th>

            
            </tr>
          </thead>

          <tbody>
            {dat}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default SouscriptionPage;


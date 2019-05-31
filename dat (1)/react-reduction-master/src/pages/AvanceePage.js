import Swal from 'sweetalert2';
import Page from 'components/Page';
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
class AvanceePage extends Component {
  
  
  state = {
    avance: [],
    newavanceData: {
      numavance: '',
      montant: '',
      date:'',
     
    },
    editavanceData: {
      
      numavance: '',
      montant: '',
      date : ''
    },

   
    newavanceModal: false,
    editavanceModal: false
  }
  componentWillMount() {
    this._refreshavance();
  }
  toggleNewavanceModal() {
    this.setState({
      newavanceModal: ! this.state.newavanceModal
    });
  }
  toggleEditavanceModal() {
    this.setState({
      editavanceModal: ! this.state.editavanceModal
    });
  }

 
  addavance() {
    axios.post('http://localhost:8080/api/avance', this.state.newavanceData).then((response) => {
      console.log(response);
    let { avance } = this.state;

      avance.push(response.data);

      this.setState({ avance, newavanceModal: false, newavanceData: {
        
      numavance: '',montant: '',
      date:''
  }});

    });
  }
  updateavance() {
    let { numavance, montant, date } = this.state.editavanceData;

    axios.put('http://localhost:8080/api/avance/' + this.state.editavanceData.id,  this.state.editavanceData).then((response) => {
    
      this._refreshavance() ;
      this.setState({
        editavanceModal: false, 
        editavanceData: response 
      })
    });
  }
  editavance(id, numavance, montant, date) {
    this.setState({
      editavanceData: { id, numavance, montant, date }, editavanceModal: ! this.state.editavanceModal
    });
  }

  
  
  deleteavance(id) {
    (Swal.fire({
      title: 'Etes-vous sur de supprimer votre demande?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Votre demande est supprimé'
    }).then(()=>axios.delete('http://localhost:8080/api/avance/' + id).then((response) => {
      this._refreshavance();
  }).then((result) => {
        Swal.fire(
          'Supprimé!'
          
          
        )
      }
    )));}
 
  _refreshavance() {
    axios.get('http://localhost:8080/api/avance').then((response) => {
      this.setState({
        avance: response.data
      })
    });
  }
  render() {
    let avance = this.state.avance.map((avance) => {
      return (
        <tr key={avance.id}>
          
          <td>{avance.id}</td>
          <td>{avance.numavance}</td>
          <td>{avance.montant}</td>
           <td>{avance.date}</td>
          
         
          <td>
            
            <Button color="danger" size="sm" onClick={this.deleteavance.bind(this, avance.id)}>Supprimer</Button>
            <Button color="success" size="sm" className="mr-2" onClick={this.editavance.bind(this, avance.id, avance.numavance, avance.montant, avance.date)}>Modifier</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Demande d'avance</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewavanceModal.bind(this)}>Ajouter une avance</Button>

      <Modal isOpen={this.state.newavanceModal} toggle={this.toggleNewavanceModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewavanceModal.bind(this)}>Ajouter une avance</ModalHeader>
        <ModalBody>
        <Row>
      <Col xl={6} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form>
             
          <FormGroup>
            <Label for="title">Num d'avance</Label>
            <Input contrat="contrat" type="number" value={this.state.newavanceData.numavance} onChange={(e) => {
              let { newavanceData } = this.state;

              newavanceData.numavance = e.target.value;

              this.setState({ newavanceData });
            }} />
          </FormGroup>
          
          
                <FormGroup>
                  <Label for="exampleNumber">Montant</Label>
                  <Input
                    type="number" value={this.state.newavanceData.montant} onChange={(e) => {
                      let { newavanceData } = this.state;
        
                      newavanceData.montant = e.target.value;
        
                      this.setState({ newavanceData });
                    }} />              
                </FormGroup>
              
               
                
                
                <FormGroup>
                  <Label for="exampleDate">Date de demande</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate" value={this.state.newavanceData.date} onChange={(e) => {
                      let { newavanceData } = this.state;
        
                      newavanceData.date = e.target.value;
        
                      this.setState({ newavanceData });
                    }} />
                  
                </FormGroup>
              
</Form>
</CardBody>
</Card>
</Col>
              
      </Row> 


        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addavance.bind(this)}>Valider</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewavanceModal.bind(this)}>Annuler</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.editavanceModal} toggle={this.toggleEditavanceModal.bind(this)}>
        <ModalHeader toggle={this.toggleEditavanceModal.bind(this)}>Modifier votre avance</ModalHeader>
        <ModalBody>
        
          <FormGroup>
            <Label for="title">Numéro d'avance</Label>
            <Input id="title" value={this.state.editavanceData.numavance} onChange={(e) => {
              let { editavanceData } = this.state;

              editavanceData.numavance = e.target.value;

              this.setState({ editavanceData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Montant</Label>
            <Input id="rating" value={this.state.editavanceData.montant} onChange={(e) => {
              let { editavanceData } = this.state;

              editavanceData.montant = e.target.value;

              this.setState({ editavanceData });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Date de demande</Label>
            <Input id="rating" value={this.state.editavanceData.date} onChange={(e) => {
              let { editavanceData } = this.state;

              editavanceData.date = e.target.value;

              this.setState({ editavanceData });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateavance.bind(this)}>Valider</Button>{' '}
          <Button color="secondary" onClick={this.toggleEditavanceModal.bind(this)}>Annuler</Button>
        </ModalFooter>
      </Modal>



      

        <Table>
          <thead>
            <tr>
              <th>Id</th>                  
              <th>Numéro d'avance</th>  
              <th>solde</th>
              <th>Date </th>
              

            
            </tr>
          </thead>

          <tbody>
            {avance}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AvanceePage;


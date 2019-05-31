import Swal from 'sweetalert2';
import Page from 'components/Page';
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
class SouscriptionPage extends Component {
  
  constructor() {
    super();
    this.state = {
      dat: [],
      newdatData: {
        client: '',
        contrat: 0,
        datecreation:'',
        devise:'',
        raison: '',
        role: '',
        tarification: '',
        produit:'',
        numCompte:'',
        gestionnaire:'',
        montant:0,
        duree:''
      },
      maxMontant:400000,

      newdatModal: false,
      newetapeModal:false,
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange = (e) => {
                    let NState = {...this.state };
                    let {newdatData} = NState
                    newdatData[e.target.name]= e.target.value;
                    NState = {...NState,newdatData};
                      this.setState(NState);
        
                     // this.setState({ ...this.state, newdatData });                
  }
  
  componentWillMount() {
    this._refreshdat();
  }
  toggleNewdatModal() {
    this.setState({
      newdatModal: !this.state.newdatModal
    });
  }
  toggleNewetapeModal() {
    this.setState({
      newetapeModal: !this.state.newetapeModal
    });
  }
  
 
  adddat() {
    axios.post('http://localhost:8080/api/dat', this.state.newdatData).then((response) => {
      console.log(response);
    let { dat } = this.state;
    this.retrait(this.state.newdatData.numCompte,this.state.newdatData.tarification);
      dat.push(response.data);

      this.setState({ dat, newdatModal: false, newdatData: {
        
      contrat: '',client: '',tarification:'' ,devise:'',
      datecreation:'',
     

role: '',raison: '',produit:''
  }});

    });
    this.setState({
      newdatModal: ! this.state.newdatModal,
      newetapeModal: !this.state.newetapeModal
    });
  }
  retrait(numCompte,montant) {
    axios.post('http://localhost:8080/api/retrait/'+125683+'/'+montant)
    .then((response) => {
    console.log(response)  
  })
  }
  versement(numCompte,montant) {
    axios.post('http://localhost:8080/api/versement/'+125683+'/'+montant)
    .then((response) => {
    console.log(response)  
  })
  }
  
  deletedat(dat) {
    (Swal.fire({
    title: 'Etes-vous sur de supprimer votre demande?',
    type: 'warning',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Le dat est supprimé'
  }).then(()=> {this.versement('',dat.tarification)})
  .then(()=>axios.delete('http://localhost:8080/api/dat/' + dat.contrat).then((response) => {
    this._refreshdat();
    //this.versement(this.state.newdatData.numCompte,this.state.newdatData.tarification);

}).then((result) => {
      Swal.fire(
        'Supprimé!',
        'Votre DAT est supprimé',
        'success'
      )
    }
  )));
}
  //recuperer data
  _refreshdat() {
    axios.get('http://localhost:8080/api/dat').then((response) => {
      this.setState({
        dat: response.data
      })
    });
  }
  _refreshcompte() {
    axios.get('http://localhost:8080/api/compte').then((response) => {
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
          <td>{dat.produit}</td>
         
          <td>
            <Button color="danger" size="sm" onClick={this.deletedat.bind(this, dat)}>Annuler</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">

      <h1>Souscription</h1>

      <Button className="my-3" color="primary" onClick={this.toggleNewdatModal.bind(this)}>Ajouter un dat</Button>

      <Modal isOpen={this.state.newdatModal} toggle={this.toggleNewdatModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewdatModal.bind(this)}>Souscrire à un nouveau dat</ModalHeader>
        <ModalBody>
        <Row>
      <Col xl={6} lg={12} md={12}>
          <Card>
            <CardBody>
              <Form>
          <FormGroup>
            <Label for="title">Contrat</Label>
            <Input contrat="contrat" type="number" name="contrat" value={this.state.newdatData.contrat} onChange={this.onChange} />
          </FormGroup>
          {/* <FormGroup>
          <Label for="numCompte">Numéro de compte</Label>
            <Input  type="number" name="numCompte" value={this.state.newdatData.numCompte} onChange={this.onChange} />
          </FormGroup> */}
          
                <FormGroup>
                  <Label for="exampleNumber">client</Label>
                  <Input
                    type="text"  name="client" value={this.state.newdatData.client} onChange={this.onChange} />              
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNumber">Tarification</Label>
                  <Input
                    name="tarification"
                    value={this.state.newdatData.tarification} onChange={this.onChange}  
                    placeholder="Standard" disabled
                  />
                </FormGroup>             
                <FormGroup>
                  <Label for="exampleDate">Date de création</Label>
                  <Input
                    type="date"
                    name="datecreation"
                    id="exampleDate" value={this.state.newdatData.datecreation} onChange={this.onChange} />
                  
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Role</Label>
                  <Input type="select" name="role"   value={this.state.newdatData.role} onChange={this.onChange} >
            <option value="Administrateur">Administrateur</option>
                    <option value="Associé">Associé</option>
                    <option value="Tuteur">Tuteur</option>
                    <option value="Titulaire">Titulaire</option>
          
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
                  <Input type="text" name="duree" value={this.state.newdatData.produit} onChange={this.onChange}
                  placeholder="DAT STANDARD" disabled>

                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelectMulti">Devise</Label>
                  <Input type="select" name="devise" value={this.state.newdatData.devise} onChange={this.onChange} >
                    <option value="EURO">EURO</option>
                    <option value="MAD">MAD</option>

                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Raison</Label>
                  <Input type="textarea" name="raison" value={this.state.newdatData.raison} onChange={this.onChange}/>
                </FormGroup>
                
                
               
              </Form>
              </CardBody>
             
</Card>        
        </Col>      
      </Row> 


        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={this.adddat.bind(this)}>Ajouter</Button>{' '} */}
          <Button color="primary" onClick={this.toggleNewetapeModal.bind(this)}>Suivant</Button>
        </ModalFooter>
      </Modal>


{/* <Button className="my-3" color="primary" onClick={this.toggleNewetapeModal.bind(this)}>Ajouter un dat</Button> */}
<Modal isOpen={this.state.newetapeModal} toggle={this.toggleNewetapeModal.bind(this)}>
  <ModalHeader toggle={this.toggleNewetapeModal.bind(this)}>étape 2 de souscription </ModalHeader>
  <ModalBody>
  <Row>
<Col xl={6} lg={12} md={12}>
    <Card>
      <CardBody>
        <Form>     
          <FormGroup>
<Label for="montant">Numéro de compte</Label>
      <Input  type="number" name="numCompte" value={this.state.newdatData.numCompte} onChange={this.onChange} placeholder="125683" disabled/>
    </FormGroup>
    <FormGroup>
      <Label for="title">Gestionnaire</Label>
      <Input  type="text"  name="gestionnaire" value={this.state.newdatData.gestionnaire} onChange={this.onChange} placeholder="agence twin center" disabled/>
    </FormGroup>
    <FormGroup>
    <Label for="montant">Montant</Label>
      <Input  type="number" name="tarification" min="5000" max={this.state.maxMontant} value={this.state.newdatData.tarification} onChange={this.onChange} />
    {
          <span class="help-block" >merci d'entrer un montant valid</span>   
                                   }
    </FormGroup>
   
          
         
         
</Form>
</CardBody>
</Card>
</Col>
  <Col xl={6} lg={12} md={12}>
  <Card>
  <CardBody>
  <Form>
          <FormGroup>
            <Label for="exampleSelect">Durée du DAT</Label>
            <Input type="select" name="produit" value={this.state.newdatData.duree} onChange={this.onChange}>
              <option value="Dat 6 mois">DAT 6 mois</option>
              <option value="Dat 12 mois">DAT 12 mois</option>
              <option value="Dat 24 mois">DAT 24 mois</option>
              <option value="Dat 2 mois">DAT 2 mois</option>

            </Input>
          </FormGroup>
         
          
          
          
         
        </Form>
        </CardBody>
       
</Card>        
  </Col>      
</Row> 


  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={this.adddat.bind(this)}>Ajouter</Button>{' '}
    <Button color="secondary" onClick={this.toggleNewdatModal.bind(this)}>Cancel</Button>
  </ModalFooter>
</Modal>

      

        <Table>
          <thead>
            <tr>
              <th>Contrat</th>                  
              <th>CLient</th>  
              <th>Montant</th>
              <th>Devise</th>
              <th>Date de création</th>
              <th>Role</th>
              <th>Raison</th>
              <th>Produit DAT</th>

            
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


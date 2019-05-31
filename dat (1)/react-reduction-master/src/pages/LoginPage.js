import React,{Component} from 'react';
//import DatePicker from 'react-datepicker';
//import moment from 'moment';

class Form2 extends Component{


    constructor(props){
        super(props);
        this.state={
             comptes:[],
             formControls:{
                   numCompte:{value:0,valid:false},
                   montant:{value:0,valid:false},
                   startDate:{value:new Date(),valid:true},
                   term:{value:0,valid:false},
                
             },
             
             maxMontant:400000,
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleDate=this.handleDate.bind(this);
        this.handleValidation=this.handleValidation.bind(this);
    }

    
    componentDidMount(){
        this.fetchingComptes();
    }

    handleChange(event){
        const name=event.target.name;
        const value=event.target.value;
        let valid=false;
        let soldeCompte;
        if(name=="numCompte" || name=="term") valid=value!=0?true:false;
        if(name=="numCompte"){
              soldeCompte=event.target.childNodes[event.target.selectedIndex].getAttribute('montant');
              this.setState({
                  maxMontant:soldeCompte*0.01>400000?400000:80*soldeCompte*0.01
              })
        }
        if(name=="montant") if(value<=this.state.maxMontant && value>=5000) valid=true;
        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                   value:value,
                   valid:valid
                 }
            }
        });
    }

    handleDate(date){
        this.setState({
            formControls:{
                ...this.state.formControls,
                startDate:{
                    ...this.state.formControls.startDate,
                    value:date
                }
            }   
          })
    }
    fetchingComptes(){
        const numCompte=this.props.compte.numCompte;
        //const deviseId=this.props.deviseId;
                
        fetch("http://localhost:8080/compte/"+numCompte).
        then(response=>response.json()).
        then(data=>this.setState({compte:data}));
    }
    handleValidation(formControls){
        if(formControls.montant.valid==true 
            && formControls.numCompte.valid==true
            && formControls.term.valid==true){
                this.props.onValidCompteDat(formControls);
            }
           
  
         
        
    }

    render(){
  

        const comptes=this.state.comptes;
        const validCompte=this.state.formControls.numCompte.valid;
        const validTerm=this.state.formControls.term.valid;
        const validMontant=this.state.formControls.montant.valid;
        const formControls=this.state.formControls;
        return(
            <div class="form-container">
            <h2>Etape 2</h2>

            <form>
                    <div class="form-row">
                                    <label htmlFor="groupeProduit">groupe produit:</label>
                                    <input type="text" readOnly class="form-control" id="groupe produit"/>          
                    </div>
                    <div class="form-row align-items-center">
                    <div class="col-auto my-1">
                    <label htmlFor="numCompte">numero de compte:</label>
                    <select  class="custom-select mr-sm-2" name="numCompte" id="numCompte" value={formControls.numCompte.value} onChange={this.handleChange}>
                                            <option value="0" montant="0">choose Comptes:</option>
                                   {   
                                       comptes.map(c=>
                                             <option  key={c.id} value={c.id} montant={c.solde}>{c.numeroDeCompte}</option>
                                        )
                                   }
                    </select>
                                  {
                                      !validCompte && <span class="help-block" >Please choose an acount</span>   
                                   }  
                    </div>
                    </div>
                    <div class="form-row">
                            <div class="col-auto my-1">
                            <label htmlFor="montant">montant:</label>
                            <input type="number" class="form-control" id="montant" name="montant" min="5000" 
                            max={this.state.maxMontant} value={formControls.montant.value} onChange={this.handleChange}/> 
                                   {
                                      !validMontant && <span class="help-block" >merci d'entrer un montant valid</span>   
                                   }  
                            </div>         
                    </div>
                    <div class="form-row">
                            <div class="col-auto my-1">
                            <label htmlFor="dateEcheance">date d'echance:</label>
                            </div>   
                            {/* <DatePicker minDate={new Date()} name="dateEcheance" id="dateEcheance" selected={formControls.startDate.value} onChange={ this.handleDate } dateFormat="dd/MM/YYYY"/> */}
                            
                    </div>
                    <div class="form-row align-items-center">
                             <div class="col-auto my-1">
                             <label  htmlFor="terme">terme:</label>
                             <select  class="custom-select mr-sm-2" name="term" id="term" value={formControls.term.value} onChange={this.handleChange}>
                                    <option selected value="0">choose term:</option>
                                     <option value="3">3M</option>
                                     <option value="6">6M</option>
                                     <option value="9">9M</option>
                                     <option value="12">12M</option>
                                     <option value="18">18M</option>
                                     <option value="24">24M</option>
                                     <option value="36">36M</option>
                             </select>
                                   {
                                      !validTerm && <span class="help-block" >Please choose terme</span>   
                                   }       
                             </div>  
                     </div>


                      <button type="button" class="nextBtn btn btn-link" onClick={()=>this.handleValidation(formControls)}>valider</button>
            </form>
            </div>
        )
    }
}
export default Form2;
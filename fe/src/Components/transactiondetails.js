import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios'


class Transactions extends Component{

    constructor(){
        super()
        this.state = {
            walletid : '',
            skip : '',
            limit: ''
        }
    }



    walletIDHandleChange = (e) => {

        this.setState ({walletid : e.target.value})

    }

    skipHandleChange = (e) => {

        this.setState ({skip: e.target.value})

    }

    limitHandleChange = (e) => {

        this.setState ({limit: e.target.value})

    }


    fetchTransactions = () => {

        axios.get('http://localhost:5000/transactions', {
            params: {
                walletid : this.state.walletid,
                skip : this.state.skip,
                limit : this.state.limit

            }
        }
        )
        .then(response => {
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })

    }


    render()
    
    {

        const input = {
            marginTop: '10px',
            marginLeft: '10px',
        
        }

        const button = {
            border: '1px solid',
            padding: '0px 0px',
            paddingLeft: '2px',
            
        }

        return (
            <div>
               <div style = {input}>
                 <input type = 'text' placeholder = 'WalletID' onChange = {this.walletIDHandleChange} ></input>
                 <input type = 'text' placeholder = 'Skip' onChange = {this.skipHandleChange} ></input>
                 <input type = 'text' placeholder = 'Limit' onChange = {this.limitHandleChange} ></input>
                    
                    <Button style = {button} onClick = {() => this.fetchTransactions()}>Fetch</Button>
                
            </div>
            </div>
        )
    }
}

export default withRouter(Transactions)
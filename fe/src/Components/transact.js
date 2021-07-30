import React, {Component} from 'react'
import axios from 'axios'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';




class Maketransactions extends Component{

    constructor(props){
        super()


        this.state = {
            walletid: '',
            amount : '',
            desciption : '',
        }
    }


    amountHandleChange = (e) => {
        this.setState ( {amount : e.target.value}  )
    }

    
    descriptionHandleChange = (e) => {
        this.setState ( {description : e.target.value} )
    }

    walletIDHandleChange = (e) => {
        this.setState ( {walletid : e.target.value})
    }

    initiateTransaction = () => {
        axios.post('http://localhost:5000/transact', this.state)
        .then((response) => {
            console.log( response.data)
        }
        ).catch((error) => {
            console.log('error', error)
        })
    }



    render(){


        
        const input = {
            marginTop: '10px',
            marginLeft: '10px',
            marginRight: '20px',
            

        }


        const button = {
            border: '1px solid',
            padding: '0px 0px',
            paddingLeft: '2px'
        }

        return (
            <div style = {input}>
                <input type = 'text' placeholder = 'WalletID' onChange = {this.walletIDHandleChange} ></input>
                <input type = 'text' placeholder = 'Amount' onChange = {this.amountHandleChange} ></input>
                <input type = 'text' placeholder = 'Description' onChange = {this.descriptionHandleChange} ></input>
                <Button style = {button} onClick = {() => this.initiateTransaction()}>Submit</Button>

            </div>
        )
    }
}

export default withRouter(Maketransactions)
import React, {Component} from 'react'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios'



class WalletDetails extends Component{

    constructor(){
        super()
        this.state = {
            walletid : ''
        }
    }



    walletIDHandleChange = (e) => {

        this.setState ({walletid : e.target.value})

    }

    fetchWalletDetails = () =>{

            axios.get(`http://localhost:5000/wallet/${this.state.walletid}`)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
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
            paddingLeft: '2px',
        }

        return (
            <div style = {input}>
                <input type = 'text' placeholder = 'WalletID' onChange = {this.walletIDHandleChange} ></input>
                <Button style = {button} onClick = {() => this.fetchWalletDetails()}>Fetch</Button>

            </div>
        )
    }
}

export default withRouter(WalletDetails) 
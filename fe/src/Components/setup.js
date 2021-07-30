import React, {Component} from 'react'
import axios from 'axios'
import history from './history';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';


class Homepage extends Component{

        constructor(){
            super()

            this.state = {
                balance : '',
                name: ''
            }
        }


        balanceHandleChange = (e) => {
            this.setState ( {balance : e.target.value} )
        }

        nameHandleChange = (e) => {
            this.setState ( {name : e.target.value}  )
        }

        createAccount = () => {
            axios.post('http://localhost:5000/setup', this.state)
            .then((response) => {
                console.log( response.data)
                
                history.replace('/transact')
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
            paddingRight: '10px',
            

        }

        const button = {
            border: '1px solid',
            padding: '0px 0px',
            paddingLeft: '2px',  
            
        }

        axios.get('http://localhost:5000/')
        .then((response) => {
            console.log(response.data)
        })

        

        return (
            <div style = {input}>
                <input type = 'text' placeholder = 'Name' onChange = {this.nameHandleChange} ></input>
                <input type = 'text' placeholder = 'Balance' onChange = {this.balanceHandleChange} ></input>
                <Button style ={button} onClick = {() => this.createAccount()}>Submit</Button>


            </div>
        )
    }
}

export default withRouter(Homepage)
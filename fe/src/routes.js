import React from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
import Homepage from './Components/setup'
import Maketransactions from './Components/transact'

import WalletDetails from './Components/walletdetails';
import Transactions from './Components/transactiondetails';



const Routes = () => 

(
    <Switch>

        <Route exact path = '/setup' component = {withRouter(Homepage)}>  </Route>
        <Route exact path = '/transact' component = {withRouter(Maketransactions)}>  </Route>
        <Route exact path = '/wallet' component = {withRouter(WalletDetails)}>  </Route>
        <Route exact path = '/transactions' component = {withRouter(Transactions)}>  </Route>
 
    </Switch>

)


export default Routes
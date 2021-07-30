import express from 'express'
import settings from './config.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Wallet from './models/walletdetails.js'
import Transaction from './models/transactiondetails.js'


const app = express()

mongoose.connect('mongodb+srv://Reghuram:4zgLeqn5DgzM93dE@cluster0.dsgdq.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log("DB connection succesfull!"))
.catch((err) => console.log(err))


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/', (req,res) =>  {
    res.send('hi')
})


//api endpoint 1 Setup


app.post('/setup', async function (req,res) {
    const {balance, name} =  req.body


    const wallet = new Wallet({

        walletID: new mongoose.Types.ObjectId(),
        transactionID: new mongoose.Types.ObjectId(),
        name: req.body.name,
        balance: req.body.balance,
        date: Date()

    })

    const walletdetails = {}

     await wallet.save()
    .then(walresult => {
        console.log('Wallet Result',walresult)
        Object.assign(walletdetails, walresult._doc);
    })
    .catch(err => {
        console.log(err)
    })

    
    const transaction = new Transaction ({

        transactionID: walletdetails.transactionID,
        walletID: walletdetails.walletID,
        amount: req.body.balance,
        description: 'Initial Transaction',
        balance: walletdetails.balance,
        date: Date()

    })
    
    transaction.save()
    .then(result => {
        console.log('Transaction result',result)
    })
    .catch(err => {
        console.log(err)
    })

    res.send(walletdetails)
    
})


//api endpoint 2 Transact


app.post('/transact', async function (req, res) {

    const {walletid, amount, description} =  req.body

    const document = {}
   
    await Wallet.find ({walletID : req.body.walletid})
    .exec()
    .then(doc => {
        const balance = doc[0].balance
        Object.assign(document, {balance : balance});
    })
    .catch(err => {
        console.log(err)
    })

    const newbal = parseFloat(req.body.amount) + parseFloat(document.balance)
    

    await Wallet.updateOne(
        { walletID : req.body.walletid },
        {
          $set: { balance: newbal }
        }
      );
    
    const transaction = new Transaction ({

       
        transactionID: new mongoose.Types.ObjectId(),
        walletID: req.body.walletid,
        amount: req.body.amount,
        description: req.body.description,
        balance: newbal,
        date: Date()

    })
    
    

    transaction.save()
    .then(result => {
        console.log('result',result)
    })
    .catch(err => {
        console.log(err)
    })


    res.json({
        message: "Transaction Data submitted succesfully",
        Transactiondetails: {balance : transaction.balance, transactionID : transaction.transactionID}
    })

})



//api endpoint 3 Transaction details

app.get('/transactions', (req,res) => {

    
    const walletdetails = {
        id:  req.query.walletid,
        skip: req.query.skip,
        limit: req.query.limit  
    }   

    Transaction.find({walletID : req.query.walletid}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit))
    .exec()
    .then(doc => {
        console.log('transDetails',doc)
        res.send(doc)
    })
    .catch(err => {
        console.log(err)
    })

    console.log('walletdetails', walletdetails)
    
   
})


//api endpoint 4 Wallet details


app.get('/wallet/:walletid',  (req,res) => {
    
    Wallet.find ({walletID : req.params.walletid})
    .exec()
    .then(doc => {
        console.log('Wallet details', doc)
        res.send({
            walletID : doc[0].walletID,
            name : doc[0].name,
            balance : doc[0].balance,
            date : doc[0].date
        })
    })
    .catch(err => {
        console.log(err)
    })

})



app.listen( settings.port, () => console.log(`listening on port: ${settings.port} `) )
import mongoose from 'mongoose'


const transactionSchema = mongoose.Schema({

    
    transactionID: mongoose.Schema.Types.ObjectId,
    walletID: String,
    amount: String,
    description: String,
    balance: Number,
    date: String
});

const transaction = mongoose.model('Transaction', transactionSchema)

export default transaction
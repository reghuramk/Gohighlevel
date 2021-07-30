import mongoose from 'mongoose'


const walletSchema = mongoose.Schema({
    walletID: mongoose.Schema.Types.ObjectId,
    transactionID: mongoose.Schema.Types.ObjectId,
    name: String,
    balance: Number,
    date: String
});

const wallet = mongoose.model('Wallet', walletSchema)

export default wallet
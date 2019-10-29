const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(mongoURI, options)

const userSchema = require('./models/UserModel')

mongoose.model('User', userSchema)

mongoose.connection.on('connected', async () => {
    console.log('Mongoose default connection open to ' + mongoURI)

    const UserModel = mongoose.model('User')

    const newUser = UserModel({
        mail: 'mottard.maxence@gmail.com',
        password: 'azertyuiop',
        firstname: 'Maxence',
        lastname: 'Mottard'
    })

    try {
        await newUser.validate();
        console.log(await newUser.save());
    } catch (e) {
        console.log(e);
    }

})


mongoose.connection.on('error', (err) => {
    console.log('handle mongo errored connections: ' + err)
})


mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected')
})


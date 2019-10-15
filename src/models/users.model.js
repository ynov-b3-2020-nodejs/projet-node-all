//TODO modèle user -> attendre la BDD
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mail: { type: 'string', unique: true, required: true },
    password: { type: 'sting', required: true },
    firstname: { type: 'string', required: true },
    lastname: { type: 'string', required: true },
    isAbsent: { type: 'boolean', required: true },
    imageURL: { type: 'string'}
});


module.exports = userSchema;
//VOICI LE MODELE : (remplacer heros par users et ajouter les champs nécessaires (age, nom, prénom......)

//var herosSchema = new Schema({
//       name :{
//             type: String,
//             unique : false,
//             required : true
//       },
//       description : {
//             type: String,
//             unique : false,
//             required : true
//       }}, {
//             timestamps: true
// });
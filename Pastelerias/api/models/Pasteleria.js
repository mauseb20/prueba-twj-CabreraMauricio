/**
 * Pasteleria.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        idPasteleria:{
            type: 'number',
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            size: 6
        },

        nombrePasteleria:{
            type: 'string',
            required: true,
            size: 100
        },

        ciudad: {
            type: 'string',
            required: true,
            size: 100
        },

        correo:{
            type: 'email',
            required: true,
            size: 100
        },

        Pasteles:{
            collection: 'Pastel',
            via: 'PasteleriaPrepara'
        }
    }
};


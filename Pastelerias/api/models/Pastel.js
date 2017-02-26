/**
 * Pastel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        idPastel: {
            type: 'number',
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            size: 6
        },

        nombrePastel:{
            type: 'string',
            required: true,
            size: 100
        },
        
        tmpElaboracion:{
            type: 'integer',
            required: true,
        },
        
        urlFoto:{
            type: 'string',
            required: true,
            size: 300
        },
        
        PasteleriaPrepara:{
            model: 'Pasteleria'
        }
        
        
    }
};


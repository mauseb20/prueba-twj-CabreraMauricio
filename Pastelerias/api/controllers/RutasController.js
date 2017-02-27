/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    home: function (req, res) {
        Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
            if (error) return res.serverError();

            return res.view('homepage',{
                title: 'home',
                tituloError: '',
                pasteleriaActual: 0,
                pastelerias: pasteleriasEncontradas
            })
        })
        // res.view(String: Nombre vista, Datos JSON)

    },

    pasteles: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        var parametros = req.allParams();
        if (parametros.idPasteleria){
            Pasteleria.findOne({
                idPasteleria: parametros.idPasteleria
            }).populate('Pasteles').exec(function(error,pasteleriaEncontrada){
                if (error) return res.serverError();
                Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                    if (error) return res.serverError();
                    return res.view('Pasteles/Pasteles',{
                        title: 'pasteles',
                        tituloError: '',
                        pasteleriaActual: parametros.idPasteleria,
                        pasteleria: pasteleriaEncontrada,
                        pastelerias: pasteleriasEncontradas
                    })
                })
            })
        }
    },

    crearPastel: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
            if (error) return res.serverError();
            return res.view('Pasteles/CrearPastel',{
                title: 'pasteles',
                tituloError: '',
                pasteleriaActual: 0,
                pastelerias: pasteleriasEncontradas
            })
        })

    },
    editarPastel: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Pasteles/EditarPastel',{
            title: 'pasteles',
            tituloError: ''
        })
    },
    crearPasteleria: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Pastelerias/CrearPasteleria',{
            title: 'pasteles',
            tituloError: ''
        })
    },
    editarPasteleria: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Pastelerias/EditarPasteleria',{
            title: 'pasteles',
            tituloError: ''
        })
    },
};


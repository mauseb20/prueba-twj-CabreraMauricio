/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    home: function (req, res) {

        // res.view(String: Nombre vista, Datos JSON)
        return res.view('homepage',{
            title: 'home',
            tituloError: ''
        })
    },

    crearPastel: function (req, res) {
        // res.view(String: Nombre vista, Datos JSON)
        return res.view('Pasteles/CrearPastel',{
            title: 'pasteles',
            tituloError: ''
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


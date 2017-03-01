/**
 * PasteleriaController
 *
 * @description :: Server-side logic for managing Pastelerias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    crearPasteleria: function(req,res){
        var parametros = req.allParams();
        if (req.method = 'POST'){
            if(parametros.nombrePasteleria && parametros.ciudad && parametros.correo){
                Pasteleria.findOne({
                    nombrePasteleria: parametros.nombrePasteleria,
                    ciudad: parametros.ciudad
                }).exec(function(error,pasteleriaEncontrada){
                    if (pasteleriaEncontrada){
                        Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                            if (error) return res.serverError();
                            return res.view('error',{
                                title: 'pasteles',
                                tituloError: 'error',
                                pasteleriaActual: 0,
                                pastelerias: pasteleriasEncontradas,
                                error: 'La Pasteleria'+parametros.nombrePasteleria+'ya esta registrada en el catalogo',
                                url: '/agregarPasteleria'
                            })
                        })
                    }else{
                        Pasteleria.create({
                            nombrePasteleria: parametros.nombrePasteleria,
                            ciudad: parametros.ciudad,
                            correo: parametros.correo
                        }).exec(function(error,pasteleriaCreada){
                            Pasteleria.findOne({
                                idPasteleria: pasteleriaCreada.idPasteleria
                            }).populate('Pasteles').exec(function(error,pasteleriaEncontrada){
                                if (error) return res.serverError();
                                Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                                    if (error) return res.serverError();
                                    return res.view('Pasteles/Pasteles',{
                                        title: 'pasteles',
                                        tituloError: '',
                                        pasteleriaActual: pasteleriaCreada.idPasteleria,
                                        pasteleria: pasteleriaEncontrada,
                                        pastelerias: pasteleriasEncontradas
                                    })
                                })
                            })
                        })
                    }
                })
            }else{
                Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                    if (error) return res.serverError();
                    return res.view('error',{
                        title: 'pasteles',
                        tituloError: 'error',
                        pasteleriaActual: 0,
                        pastelerias: pasteleriasEncontradas,
                        error: 'Uno o mas campos se encuentran vacios',
                        url: '/agregarPasteleria'
                    })
                })
            }
        }else{
            Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                if (error) return res.serverError();
                return res.view('error',{
                    title: 'pasteles',
                    tituloError: 'error',
                    pasteleriaActual: 0,
                    pastelerias: pasteleriasEncontradas,
                    error: 'Metodo no permitido',
                    url: '/agregarPasteleria'
                })
            })
        }
    },

    editarPasteleria: function (req,res){
        var parametros = req.allParams();
        if (req.method = 'POST'){
            if(parametros.nombrePasteleria && parametros.ciudad && parametros.correo){
                var pasteleriaAEditar ={
                    nombrePasteleria: parametros.nombrePasteleria,
                    ciudad: parametros.ciudad,
                    correo: parametros.correo
                };
                Pasteleria.findOne({
                    idPasteleria: parametros.idPasteleria
                }).exec(function(error,pasteleriaEncontrada){
                    if (parametros.nombrePasteleria == pasteleriaEncontrada.nombrePasteleria){
                        delete pasteleriaAEditar.nombrePasteleria
                    }
                    if(parametros.ciudad==pasteleriaEncontrada.ciudad){
                        delete pasteleriaAEditar.ciudad
                    }
                    if (parametros.correo==pasteleriaEncontrada.correo){
                        delete pasteleriaAEditar.correo
                    }

                    if(pasteleriaAEditar.nombrePasteleria || pasteleriaAEditar.ciudad || pasteleriaAEditar.correo){
                        Pasteleria.findOne({
                            nombrePasteleria: parametros.nombrePasteleria,
                        }).exec(function(error,pasteleriaIgual){
                            if(pasteleriaIgual){
                                if (pasteleriaAEditar.ciudad && pasteleriaAEditar.ciudad==pasteleriaIgual.ciudad){
                                    Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                                        if (error) return res.serverError();
                                        return res.view('error',{
                                            title: 'pasteles',
                                            tituloError: 'error',
                                            pasteleriaActual: 0,
                                            pastelerias: pasteleriasEncontradas,
                                            error: 'La Pasteleria'+parametros.nombrePasteleria+'ya esta registrada en el catalogo',
                                            url: '/pasteles?idPasteleria='+parametros.idPasteleria
                                        })
                                    })
                                }else{
                                    Pasteleria.update({
                                        idPasteleria: parametros.idPasteleria
                                    },pasteleriaAEditar).exec(function(error,pasteleriaActualizada){
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
                                    })
                                }
                            }else{
                                Pasteleria.update({
                                    idPasteleria: parametros.idPasteleria
                                },pasteleriaAEditar).exec(function(error,pasteleriaActualizada){
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
                                })
                            }
                        })

                    }else{
                        Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                            if (error) return res.serverError();
                            return res.view('error',{
                                title: 'pasteles',
                                tituloError: 'error',
                                pasteleriaActual: parametros.idPasteleria,
                                pastelerias: pasteleriasEncontradas,
                                error: 'El pastel no ha sido actualizado',
                                url: '/pasteles?idPasteleria='+parametros.idPasteleria
                            })
                        })
                    }
                })
            }else{
                Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                    if (error) return res.serverError();
                    return res.view('error',{
                        title: 'pasteles',
                        tituloError: 'error',
                        pasteleriaActual: parametros.idPasteleria,
                        pastelerias: pasteleriasEncontradas,
                        error: 'Uno o mas campos se encuentran vacios',
                        url: '/pasteles?idPasteleria='+parametros.idPasteleria
                    })
                })
            }
        }else{
            Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                if (error) return res.serverError();
                return res.view('error',{
                    title: 'pasteles',
                    tituloError: 'error',
                    pasteleriaActual: parametros.idPasteleria,
                    pastelerias: pasteleriasEncontradas,
                    error: 'Metodo no permitido',
                    url: '/pasteles?idPasteleria='+parametros.idPasteleria
                })
            })
        }
    },

    borrarPasteleria: function(req,res){
        var parametros = req.allParams();
        if(parametros.idPasteleria){
            Pasteleria.destroy({
                idPasteleria: parametros.idPasteleria
            }).exec(function(error,pasteleriaEliminada){
                Pastel.destroy({
                    PasteleriaPrepara: parametros.idPasteleria
                }).exec(function(error,pastelesEliminados){
                    Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                        if (error) return res.serverError();
                        return res.view('homepage',{
                            title: 'home',
                            tituloError: '',
                            pasteleriaActual: 0,
                            pastelerias: pasteleriasEncontradas
                        })
                    })
                })
            })
        }else{
            Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                if (error) return res.serverError();
                return res.view('error',{
                    title: 'pasteles',
                    tituloError: 'error',
                    pasteleriaActual: parametros.idPasteleria,
                    pastelerias: pasteleriasEncontradas,
                    error: 'No envia los parametros necesarios',
                    url: '/pasteles?idPasteleria='+parametros.idPasteleria
                })
            })
        }
    }
};


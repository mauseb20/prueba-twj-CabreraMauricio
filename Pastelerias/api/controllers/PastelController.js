/**
 * PastelController
 *
 * @description :: Server-side logic for managing Pastels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    crearPastel:function(req,res){
        var parametros = req.allParams();
        if (req.method = 'POST'){
            if (parametros.nombrePastel && parametros.tmpElaboracion && parametros.urlFoto && parametros.PasteleriaPrepara){
                Pastel.findOne({
                    PasteleriaPrepara: parametros.PasteleriaPrepara,
                    nombrePastel: parametros.nombrePastel
                }).exec(function(error,pastelEncontrado){
                    if(pastelEncontrado != undefined){
                        Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                            if (error) return res.serverError();
                            return res.view('error',{
                                title: 'pasteles',
                                tituloError: 'error',
                                pasteleriaActual: 0,
                                pastelerias: pasteleriasEncontradas,
                                error: 'El pastel ya se encuentra en el catalogo',
                                url: '/agregarPastel'
                            })
                        })
                    }else{
                        Pastel.create({
                            nombrePastel: parametros.nombrePastel,
                            tmpElaboracion: parametros.tmpElaboracion,
                            urlFoto: parametros.urlFoto,
                            PasteleriaPrepara: parametros.PasteleriaPrepara
                        }).exec(function(error,pastelCreado){
                            if (error) return res.serverError();
                            Pasteleria.findOne({
                                idPasteleria: parametros.PasteleriaPrepara
                            }).populate('Pasteles').exec(function(error,pasteleriaEncontrada){
                                if (error) return res.serverError();
                                Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                                    if (error) return res.serverError();
                                    return res.view('Pasteles/Pasteles',{
                                        title: 'pasteles',
                                        tituloError: '',
                                        pasteleriaActual: parametros.PasteleriaPrepara,
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
                        url: '/agregarPastel'
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
                    url: '/agregarPastel'
                })
            })
        }
    },

    editarPastel: function (req, res){
        var parametros = req.allParams();
        if (req.method = 'POST'){

            if (parametros.nombrePastel && parametros.tmpElaboracion && parametros.urlFoto && parametros.PasteleriaPrepara){
                Pastel.findOne({
                    idPastel: parametros.idPastel
                }).exec(function(error,pastelEncontrado1){
                    if (error) return res.serverError();
                    var pastelAEditar = {
                        nombrePastel: parametros.nombrePastel,
                        tmpElaboracion: parametros.tmpElaboracion,
                        urlFoto: parametros.urlFoto,
                        PasteleriaPrepara: parametros.PasteleriaPrepara
                    }
                    if (parametros.nombrePastel==""||parametros.nombrePastel==pastelEncontrado1.nombrePastel){
                        delete pastelAEditar.nombrePastel
                    }
                    if (parametros.tmpElaboracion==""||parametros.tmpElaboracion==pastelEncontrado1.tmpElaboracion){
                        delete pastelAEditar.tmpElaboracion
                    }
                    if (parametros.urlFoto==""||parametros.urlFoto==pastelEncontrado1.urlFoto){
                        delete pastelAEditar.urlFoto
                    }
                    if (parametros.PasteleriaPrepara==""||parametros.PasteleriaPrepara==pastelEncontrado1.PasteleriaPrepara){
                        delete pastelAEditar.PasteleriaPrepara
                    }

                    if(pastelAEditar.nombrePastel || pastelAEditar.tmpElaboracion || pastelAEditar.urlFoto || pastelAEditar.PasteleriaPrepara){
                        Pastel.findOne({
                            nombrePastel: parametros.nombrePastel
                        }).exec(function(error,pastelEncontrado2){
                            if (error) return res.serverError();
                            if (pastelEncontrado2){
                                if (pastelAEditar.PasteleriaPrepara && pastelAEditar.PasteleriaPrepara==pastelEncontrado2.PasteleriaPrepara){
                                    Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                                        if (error) return res.serverError();
                                        return res.view('error',{
                                            title: 'pasteles',
                                            tituloError: 'error',
                                            pasteleriaActual: parametros.PasteleriaPrepara,
                                            pastelerias: pasteleriasEncontradas,
                                            error: 'El pastel ya se encuentra en el catalogo',
                                            url: '/Pasteles?idPasteleria='+pastelEncontrado2.PasteleriaPrepara
                                        })
                                    })
                                }else{
                                    Pastel.update({
                                        idPastel: parametros.idPastel
                                    },pastelAEditar).exec(function(error,pastelActualizado){
                                        if (error) return res.serverError();
                                        Pasteleria.findOne({
                                            idPasteleria: parametros.PasteleriaPrepara
                                        }).populate('Pasteles').exec(function(error,pasteleriaEncontrada){
                                            if (error) return res.serverError();
                                            Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                                                if (error) return res.serverError();
                                                return res.view('Pasteles/Pasteles',{
                                                    title: 'pasteles',
                                                    tituloError: '',
                                                    pasteleriaActual: parametros.PasteleriaPrepara,
                                                    pasteleria: pasteleriaEncontrada,
                                                    pastelerias: pasteleriasEncontradas
                                                })
                                            })
                                        })
                                    })
                                }

                            }else{
                                Pastel.update({
                                    idPastel: parametros.idPastel
                                },pastelAEditar).exec(function(error,pastelActualizado){
                                    if (error) return res.serverError();
                                    Pasteleria.findOne({
                                        idPasteleria: parametros.PasteleriaPrepara
                                    }).populate('Pasteles').exec(function(error,pasteleriaEncontrada){
                                        if (error) return res.serverError();
                                        Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                                            if (error) return res.serverError();
                                            return res.view('Pasteles/Pasteles',{
                                                title: 'pasteles',
                                                tituloError: '',
                                                pasteleriaActual: parametros.PasteleriaPrepara,
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
                                pasteleriaActual: pastelEncontrado1.PasteleriaPrepara,
                                pastelerias: pasteleriasEncontradas,
                                error: 'El pastel no ha sido actualizado',
                                url: '/Pasteles?idPasteleria='+pastelEncontrado1.PasteleriaPrepara
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
                        pasteleriaActual: parametros.PasteleriaPrepara,
                        pastelerias: pasteleriasEncontradas,
                        error: 'Uno o mas campos se encuentran vacios',
                        url: '/Pasteles?idPasteleria='+parametros.PasteleriaPrepara
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
                    url: '/home'
                })
            })
        }
    },

    borrarPastel: function(req,res){
        var parametros = req.allParams();
        if(parametros.idPastel){
            Pastel.findOne({
                idPastel: parametros.idPastel
            }).exec(function(error,pastelEncontrado){
                var PasteleriaActual = pastelEncontrado.PasteleriaPrepara;
                Pastel.destroy({
                    idPastel: parametros.idPastel
                }).exec(function(error,pastelEliminado){
                    Pasteleria.findOne({
                        idPasteleria: PasteleriaActual
                    }).populate('Pasteles').exec(function(error,pasteleriaEncontrada){
                        if (error) return res.serverError();
                        Pasteleria.find().sort('nombrePasteleria ASC').exec(function(error,pasteleriasEncontradas){
                            if (error) return res.serverError();
                            return res.view('Pasteles/Pasteles',{
                                title: 'pasteles',
                                tituloError: '',
                                pasteleriaActual: PasteleriaActual,
                                pasteleria: pasteleriaEncontrada,
                                pastelerias: pasteleriasEncontradas
                            })
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
                    pasteleriaActual: 0,
                    pastelerias: pasteleriasEncontradas,
                    error: 'No envia los parametros necesarios',
                    url: '/home'
                })
            })
        }
    }
};


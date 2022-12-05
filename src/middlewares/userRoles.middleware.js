function access(...validRoles) {
    return (request, response, next) => {
        try {
            console.log("imprimiendo el Rol de usuario que hizo acceso: ", request.roleCurrent)
            if(!validRoles.includes(request.roleCurrent)) throw new Error("Se requiere permiso para el acceso")
            next()
        } catch (error) {
            response.status(403)
            response.json({
                success: false,
                message: error.message
            })
        }
    }    
}

module.exports = access
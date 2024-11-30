const esAdminRole = (req, res, next) => {
    
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token"
        });
    }

    const { rol, nombre } = req.usuario; 

    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${nombre} debe ser Administrador para realizar esta acción`
        });
    }

    next(); 
};

module.exports = { esAdminRole };

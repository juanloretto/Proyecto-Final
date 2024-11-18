const esAdminRole = (req, res, next) => {
    // Verifica si el token ha sido validado previamente
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token"
        });
    }

    const { rol, nombre } = req.usuario; // Asegúrate de que req.usuario esté definido

    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${nombre} debe ser Administrador para realizar esta acción`
        });
    }

    next(); // Llama a next() para continuar con la siguiente función middleware
};

module.exports = { esAdminRole };

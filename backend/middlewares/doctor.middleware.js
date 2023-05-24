module.exports.doctorMiddleware = async (req, res, next) => {
    if (req.user.role === "doctor") return next()

    return res.status(401).json({ message: "Unauthorized" })
}
const jwt = require("jsonwebtoken")
const secret = "sparkleaccesstoken"
const users = require('./models/Users');

let internal_role = [1, 2, 3, 4];
let super_admin_role = [4]

module.exports.createAccessToken = (user) => {
	//the user parameter comes from loggin in
	const data = {
		id: user.id,
		email: user.email,
	}
	return jwt.sign(data, secret, { expiresIn: '1d' })
}

module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization

	if (typeof token !== "undefined") {
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? res.send({ auth: "failed" }) : next()
		})
	}
	else
		return res.send({ auth: "failed" })
}

module.exports.decode = (token) => {
	if (typeof token !== "undefined") {
		token = token.slice(7, token.length)

		return jwt.verify(token, secret, (err, data) => {
			return (err) ? null : jwt.decode(token, { complete: true }).payload
		})
	}
}

module.exports.roleCheck = async (req, res, next) => {
	let token = req.headers.authorization

	if (typeof token === "undefined") return res.status(400).json({ success: false, 'msg': "not authorized" })

	token = token.slice(7, token.length)

	const result = await users.checkRole(token)
	if (!result || result.rowCount <= 0) return res.status(400).json({ success: false, 'msg': "not authorized" })

	let isInternal = internal_role.includes(parseInt(result.rows[0].role_id));

	if (!isInternal) {
		return res.status(400).json({ success: false, 'msg': "not authorized" })
	}

	next()

}
const db = require('../models');
const {
	createResponseSuccess,
	createResponseError
} = require('../helpers/responseHelper');

async function getAll() {
	try {
		const users = await db.user.findAll({ include: [db.cart] });
		return createResponseSuccess(users);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

module.exports = { getAll };
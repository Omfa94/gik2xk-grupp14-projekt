const db = require("../models");
const validate = require("validate.js");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");

async function get() {
  try {
    const carts = await db.cart.findAll();
    return createResponseSuccess(carts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getById(id) {
  try {
    const cart = await db.product.findOne({
      where: { id },
    });
    return createResponseSuccess(cart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}


async function getCartRows(userId) {
	const cart = await db.cart.findOne({ where: { userId: userId } });
	console.log(cart);
	const cartRows = await db.cartRow.findAll({
		where: { cartId: cart.id },
		include: [db.product],
	});
	return createResponseSuccess(cartRows);
}

async function addProduct(userId, productId, amount) {
	if (!userId) {
		return createResponseError(422, 'AnvändarId är obligatoriskt');
	}
	if (!productId) {
		return createResponseError(422, 'ProduktId är obligatoriskt');
	}
	if (!amount) {
		return createResponseError(422, 'Antal är obligatoriskt');
	}
	const [cart, created] = await db.cart.findOrCreate({
		where: { userId: userId },
		defaults: { userId: userId },
	});
	console.log(cart, created);

	const existingCartRow = await db.cartRow.findOne({
		where: { cartId: cart.id, productId: productId },
	});

	if (existingCartRow) {
		// Konvertera både existingCartRow.amount och amount till tal innan addition
		const updatedAmount =
			parseInt(existingCartRow.amount, 10) + parseInt(amount, 10);
		existingCartRow.amount = updatedAmount;
		await existingCartRow.save();
		return createResponseSuccess(existingCartRow);
	} else {
		// Om ingen cartRow finns, skapa en ny
		try {
			// Se till att amount är ett tal
			const newAmount = parseInt(amount, 10);
			const newCartRow = await db.cartRow.create({
				cartId: cart.id,
				productId: productId,
				amount: newAmount,
			});
			return createResponseSuccess(newCartRow);
		} catch (error) {
			// Hantera andra möjliga fel
			return createResponseError(error.status || 500, error.message);
		}
	}
}

//behöver man ens ha det? 
async function create(cart) {
	// const invalidData = validate(cart);

	// if (invalidData) {
	// 	return createResponseError(422, invalidData);
	// }
	try {
		const newCart = await db.cart.create(cart);
		return createResponseSuccess(newCart);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function update(cart, id) {
	const invalidData = validate(cart);
	if (!id) {
		return createResponseError(422, 'Id är obligatoriskt');
	}
	if (invalidData) {
		return createResponseError(422, invalidData);
	}
	try {
		await db.cart.update(cart, {
			where: {
				id,
			},
		});
		return createResponseMessage(200, 'Varukorgen uppdaterades');
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function reduceAmount(userId, productId) {
	if (!userId) {
		return createResponseError(422, 'AnvändarId är obligatoriskt');
	}
	if (!productId) {
		return createResponseError(422, 'ProduktId är obligatoriskt');
	}
	try {
		const cart = await db.cart.findOne({
			where: {
				userId,
			},
		});
		if (!cart) {
			return createResponseError(404, 'Varukorgen hittades inte');
		}
		const cartRow = await db.cartRow.findOne({
			where: {
				cartId: cart.id,
				productId,
			},
		});
		if (!cartRow) {
			return createResponseError(404, 'Varukorgsraden hittades inte');
		}
		if (cartRow.amount > 1) {
			cartRow.amount -= 1;
			const saveResult = await cartRow.save();
			console.log('Save result:', saveResult);
		} else {
			const destroyResult = await cartRow.destroy();
			console.log('Destroy result:', destroyResult);
		}
		return createResponseSuccess(cartRow);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function increaseAmount(userId, productId) {
	if (!userId) {
		return createResponseError(422, 'AnvändarId är obligatoriskt');
	}
	if (!productId) {
		return createResponseError(422, 'ProduktId är obligatoriskt');
	}
	try {
		const cart = await db.cart.findOne({
			where: {
				userId,
			},
		});
		if (!cart) {
			return createResponseError(404, 'Varukorgen hittades inte');
		}
		const cartRow = await db.cartRow.findOne({
			where: {
				cartId: cart.id,
				productId,
			},
		});
		if (!cartRow) {
			return createResponseError(404, 'Varukorgsraden hittades inte');
		}
		cartRow.amount += 1;
		await cartRow.save();
		return createResponseSuccess(cartRow);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function updateCartRow(cartId, productId, amount) {
	if (!cartId) {
		return createResponseError(422, 'VarukorgsId är obligatoriskt');
	}
	if (!productId) {
		return createResponseError(422, 'ProduktId är obligatoriskt');
	}
	if (!amount) {
		return createResponseError(422, 'Antal är obligatoriskt');
	}
	try {
		const cartRow = await db.cartRow.findOne({
			where: {
				cartId,
				productId,
			},
		});
		if (!cartRow) {
			return createResponseError(404, 'Varukorgsraden hittades inte');
		}
		cartRow.amount = amount;
		await cartRow.save();
		return createResponseSuccess(cartRow);
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

async function destroyCartRow(cartId, productId) {
	if (!cartId) {
		return createResponseError(422, 'VarukorgsId är obligatoriskt');
	}
	if (!productId) {
		return createResponseError(422, 'ProduktId är obligatoriskt');
	}
	try {
		await db.cartRow.destroy({
			where: {
				cartId,
				productId,
			},
		});
		return createResponseMessage(200, 'Varukorgsraden raderades');
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}


async function destroy(id) {
	if (!id) {
		return createResponseError(422, 'Id är obligatoriskt');
	}
	try {
		await db.cart.destroy({
			where: {
				id,
			},
		});
		return createResponseMessage(200, 'Varukorgen raderades');
	} catch (error) {
		return createResponseError(error.status, error.message);
	}
}

module.exports = {
	get,
	getById,
	getCartRows,
	create,
	addProduct,
	update,
	reduceAmount,
	increaseAmount,
	updateCartRow,
	destroyCartRow,
	destroy,
};
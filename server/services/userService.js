const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');
const constraints = {
    firstName: {
        length: {
            minimum: 2,
            maximum: 50,
            tooShort: "^First name needs to be at least %{count} characters long",
            tooLong: "^First name can be a maximum of %{count} characters long",
        },
        presence: {
            allowEmpty: false,
            message: "^First name can not be empty"
        }
    },
    lastName: {
        length: {
            minimum: 2,
            maximum: 50,
            tooShort: "^Last name needs to be at least %{count} characters long",
            tooLong: "^Last name can be a maximum of %{count} characters long",
        },
        presence: {
            allowEmpty: false,
            message: "^Last name can not be empty"
        }
    },
    email: {
        length: {
            minimum: 4,
            maximum: 50,
            tooShort: "^Email needs to be at least %{count} characters long",
            tooLong: "^Email can be a maximum of %{count} characters long",
        },
        email: {
            message: '^Email is invalid'
        },
        presence: {
            allowEmpty: false,
            message: "^Email can not be empty"
        }
    },
    password: {
        length: {
            minimum: 4,
            maximum: 200,
            tooShort: "^Password must be at least %{count} characters long",
            tooLong: "^Password can be a maximum of %{count} characters long",
        },
        presence: {
            allowEmpty: false,
            message: "^Password can not be empty"
        }
    }
}


async function getAll() {
    try {
        const allUsers = await db.user.findAll();
        return createResponseSuccess(allUsers.map(user => _formatUser(user)));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getById(id) {
    try {
        const user = await db.user.findOne({
            where:{id},
            include: [db.cart]
        });
        return createResponseSuccess(_formatUser(user));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getCart(id, cart) {
    if(!id) {
        return createResponseError(422, 'ID is required');
    }
    try {
        cart.userId = id;
        const cart = await db.cart.findOne({
            where: {id},
            include: [db.cart]
        });
        return createResponseSuccess(newCart);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function create(user) {
    const invalidData = validate(user, constraints);
    if(invalidData) {
        return createResponseError(422, invalidData);
    }
    try {
        const newUser = await db.user.create(user);
        return createResponseSuccess(newUser);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function update(user, id) {
    const invalidData = validate(user, constraints);
    if(!id) {
        return createResponseError(422, 'ID is required');
    }
    if(invalidData || !id) {
        return createResponseError(422, invalidData);
    }
    try {
        await db.user
        .update(user, {
            where: {id}
        });
        return createResponseMessage(200, 'User updated');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function destroy(id) {
    if(!id) {
        return createResponseError(422, 'ID is required');
    } 
    try {
        await db.user
        .destroy({
            where: {id}
        });
        return createResponseMessage(200, 'User deleted');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

function _formatUser(user) {
    const cleanUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
    if (user.cart) {
        cleanUser.cart = [];
        user.cart.map(cart => {
            return(cleanUser.cart = [
                {
                    paid: cart.paid,
                    createdAt: cart.createdAt,
                    updatedAt: cart.updatedAt
                }, 
                ...cleanUser.cart
            ]);
        });
    }
    return cleanUser;
}

module.exports = {
    getAll,
    getById,
    getCart,
    create,
    update,
    destroy}
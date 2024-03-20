const db = require('../models');
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require('../helpers/responseHelper');
const validate = require('validate.js');
const constraints = {
    title: {
        length: {
            minimum: 2,
            maximum: 100,
            tooShort: "^Title needs to be at least %{count} characters long",
            tooLong: "^Title can be a maximum of %{count} characters long",
        },
        presence: {
            allowEmpty: false,
            message: "^Title can not be empty"
        }
    },
    price: {
        numericality: {
            greaterThan: 0,
            message: "^Price must be a number greater than 0"
        },
        presence: {
            allowEmpty: false,
            message: "^Product must have a price"
        }
    },
    imageUrl: {
        url: {
            message: "^URL is not in a valid format",
            allowLocal: true,
        }
    }
}

async function getAll() {
    try {
        const allProducts = await db.product.findAll({
            include: [db.rating]
        });
        return createResponseSuccess(allProducts.map(product => _formatProduct(product)));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function getById(id) {
    if(!id) {
        return createResponseError(422, 'ID is required');
    }
    try {
        const product = await db.product.findOne({
            where:{id},
            include: [db.rating]
        });
        return createResponseSuccess(_formatProduct(product));
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

<<<<<<< HEAD

=======
>>>>>>> a46b2a699893ca747b0ed7b9a0ac1d623ff77b00
async function create(product) {
    const invalidData = validate(product, constraints);
    if(invalidData) {
        return createResponseError(422, invalidData);
    }
    try {
        const newProduct = await db.product.create(product);
        return createResponseSuccess(newProduct);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function update(product, id) {
    const invalidData = validate(product, constraints);
    if(!id) {
        return createResponseError(422, 'ID is required');
    }
    if(invalidData || !id) {
        return createResponseError(422, invalidData);
    }
    try {
        await db.product
        .update(product, {
            where: {id}
        });
        return createResponseMessage(200, 'Product updated');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function destroy(id) {
    if(!id) {
        return createResponseError(422, 'ID is required');
    } 
    try {
        await db.product
        .destroy({
            where: {id}
        });
        return createResponseMessage(200, 'Product deleted');
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function addRating(id, rating) {
    if(!id) {
        return createResponseError(422, 'ID is required');
    }
    try {
        rating.productId = id;
        const newRating = await db.rating.create(rating);
        return createResponseSuccess(newRating);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

function _formatProduct(product) {
    const cleanProduct = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    }
    if (product.ratings) {
        cleanProduct.ratings = [];
        product.ratings.map(rating => {
            return(cleanProduct.ratings = [
                {
                    rating: rating.rating,
                    createdAt: rating.createdAt,
                    updatedAt: rating.updatedAt
                }, 
                ...cleanProduct.ratings
            ]);
        });
    }
    return cleanProduct;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    destroy,
    addRating}
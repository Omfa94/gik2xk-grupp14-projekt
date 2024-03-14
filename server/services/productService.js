const db = require("../models");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");
const validate = require("validate.js");

const constraints = {
  title: {
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: "^Titeln måste vara minst %{count} tecken lång.",
      tooLong: "^Titeln får inte vara längre än %{count} tecken lång.",
    },
  },
};

async function getById(id) {
  try {
    const product = await db.product.findOne({
      where: { id },
      include: [
        db.rating,
        {
          model: db.rating,
          include: [db.user],
        },
      ],
    });
    return createResponseSuccess(_formatProduct(product));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getAll() {
  try {
    const allProducts = await db.product.findAll({
      include: [db.rating,
        {
          model: db.rating,
          include: [db.user],
        }]
    });
    return createResponseSuccess(allProducts.map(product=>_formatProduct(product)));
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function addRating(id, rating) {
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }
  try {
    rating.productID = id;
    const newRating = await db.rating.create(rating);
    return createResponseSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function create(product) {
  const invalidData = validate(product, constraints);
  if (invalidData) {
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
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    await db.product.update(product, {
      where: { id },
    });
    return createResponseMessage(200, "Produkten uppdaterades.");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function destroy(id) {
  if (!id) {
    return createResponseError(422, "Id är obligatoriskt");
  }
  try {
    await db.product.destroy({
      where: { id },
    });
    return createResponseMessage(200, "Produkten raderades.");
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
      createdAt: product.createdAt, // Assuming these fields exist
      updatedAt: product.updatedAt, // Assuming these fields exist
      ratings: [] // Assuming a product can have multiple ratings
    };
  
    // Format ratings if they exist
    if (product.ratings) {
      cleanProduct.ratings = product.ratings.map((rating) => {
        return {
          rating: rating.rating,
          author: rating.user ? `${rating.user.firstName} ${rating.user.lastName}` : 'Anonym',
          createdAt: rating.createdAt // Assuming this field exists
          // More fields can be added here if necessary
        };
      });
    }
  
    return cleanProduct;
  }
  

//test
// function _formatProduct(product) {
//     const cleanProduct = {
//       id: product.id,
//       title: product.title,
//       description: product.description,
//       price: product.price,
//       imageUrl: product.imageUrl,
//       createdAt: product.createdAt,
//       updatedAt: product.updatedAt,
//       ratings:[]
//     };
  
//     if (product.ratings) {
//       cleanProduct.ratings = [];
  
//       product.ratings.map((rating) => {
//         return (cleanProduct.ratings = [
//           {
//             body: rating.body,
//             author: rating.user.username,
//             createdAt: rating.createdAt
//           },
//           ...cleanProduct.ratings
//         ]);
//       });
//     }
//   }

module.exports = {
  getById,
  getAll,
  addRating,
  create,
  update,
  destroy,
};

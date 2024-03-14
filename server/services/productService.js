const db =require("../models");

async function getAll() {
    try{
        const allProducts = await db.product.findAll();
        return{status: 200, data: allProducts}
    }catch(error){
        return {status:error.status || 500,data: {error:error.message}}
    }
}
function create() {}
function update() {}
function destroy() {}

module.exports = {
  getAll,
  create,
  update,
  destroy,
};

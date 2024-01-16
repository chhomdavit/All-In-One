const {upload} = require("../util/service")
const controller = require ('../controllers/product.controller');

const product = (app) =>{
    app.get("/api/product/getList",controller.getList);
    app.post("/api/product/create",upload.single("image"),controller.create);
    app.put("/api/product/update/:id",upload.single("image"),controller.update);
    app.delete("/api/product/remove/:id",controller.remove);
}
module.exports = product;
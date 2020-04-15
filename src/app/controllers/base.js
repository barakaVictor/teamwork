class BaseController{
    constructor(model, middleware){
        this.model = model;
        this.middleware = middleware? middleware : undefined;
    }
}

module.exports = BaseController
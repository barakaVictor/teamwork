const BaseController = require('../app/controllers/base')

class ArticlesController extends BaseController{
  constructor(model) {
    super(model)
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.read = this.read.bind(this)
  }

  async read(request, response, next){
    return this.model.find({ id: request.params.articleId })
    .then((obj) => {
      if(!obj){
        return response.status(404).json({
          message: "Resource not found"
        })
      }
      return response.status(200).json({
        status: "success",
        data: obj
      })
    }).catch((error)=>next(error))
  }

  async create(request, response, next) {
    return this.model.save(request.body)
      .then((article) => response.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: article.id,
          createdOn: article.created_on,
          title: article.title,
        },
      })).catch((error) => next(error));
  }

  async update(request, response, next) {
    return this.model.find({ id: request.params.articleId })
      .then((article) => {
        if (!article) {
          return response.status(404).json({
            status: 'error',
            error: 'The requested was not found!!',
          });
        }
        const updatedArticle = Object.assign(article, request.body);
        return this.model.update(updatedArticle, { id: updatedArticle.id })
          .then((savedArticle) => response.status(200).json({
            status: 'Success',
            data: {
              message: 'Article successfully updated',
              title: savedArticle.title,
              article: savedArticle.article,
            },
          })).catch((error) => {
            throw error;
          });
      }).catch((error) => next(error));
  }

  async delete(request, response, next) {
    return this.model.find({ id: request.params.articleId })
      .then((article) => {
        if (!article) {
          return response.status(404).json({
            status: 'error',
            error: 'The requested articles could not be found',
          });
        }
        return this.model.delete({ id: article.id })
          .then(() => response.status(200).json({
            status: 'Success',
            data: {
              message: 'Article successfully deleted',
            },
          }))
          .catch((error) => {
            throw error;
          });
      }).catch((error) => next(error));
  }
}

module.exports = ArticlesController;

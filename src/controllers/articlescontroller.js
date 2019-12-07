class ArticlesController {
  constructor(Model) {
    this.model = new Model();
    this.createArticle = this.createArticle.bind(this);
  }

  async createArticle(request, response, next) {
    return this.model.save(request.body)
      .then((article) => response.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: article.id,
          createdOn: article.created_on,
          title: article.title,
        },
      })).catch((error) => next(error));
  }

  async patch(request, response, next) {
    return this.model.find({ id: request.params.articleId })
      .then((article) => {
        if (!article) {
          return response.status(404).json({
            status: 'error',
            error: 'The requested was not found!!',
          });
        }
        const newArticle = request.body;
        return this.model.update(newArticle)
          .then((savedArticle) => response.status(200).json({
            status: 'Success',
            data: {
              message: 'Article successfully updated',
              title: savedArticle.title,
              article: savedArticle.article,
            },
          })).catch((error) => {
            throw new Error(error);
          });
      }).catch((error) => next(error));
  }
}

module.exports = ArticlesController;

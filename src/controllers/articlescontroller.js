class ArticlesController {
  constructor(Model) {
    this.model = new Model();
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
}

module.exports = ArticlesController;

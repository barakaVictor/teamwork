class CommentsController {
  constructor(Model) {
    this.model = new Model();
    this.commentOnArticle = this.commentOnArticle.bind(this);
    this.commentOnGif = this.commentOnGif.bind(this);
  }

  async commentOnArticle(request, response, next) {
    const comment = {
      articleId: request.params.articleId,
      userId: request.body.authorID,
      comment: request.body.comment,
    };
    return this.model.save(comment)
      .then((result) => response.status(200).json({
        status: 'Success',
        data: {
          message: 'Comment successfully created',
          createdOn: result.comment.created_on,
          articleTitle: result.article.title,
          article: result.article.article,
          comment: result.comment.comment,
        },
      })).catch((error) => next(error));
  }

  async commentOnGif(request, response, next) {
    return response.status(400).json({
      status: 'error',
      error: 'This functionality is yet to be implemented',
    });
  }
}

module.exports = CommentsController;

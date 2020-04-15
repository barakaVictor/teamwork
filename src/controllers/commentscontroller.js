class CommentsController {
  constructor(model) {
    this.model = model;
    this.commentOnArticle = this.commentOnArticle.bind(this);
    this.commentOnGif = this.commentOnGif.bind(this);
  }

  async commentOnArticle(request, response, next) {
    const comment = {
      articleid: request.params.articleId,
      userid: request.body.authorID,
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
    const comment = {
      gifid: request.params.gifId,
      userid: request.body.authorID,
      comment: request.body.comment,
    };
    return this.model.save(comment)
      .then((result) => response.status(200).json({
        status: 'Success',
        data: {
          message: 'Comment successfully created',
          createdOn: result.comment.created_on,
          gifTitle: result.gif.title,
          comment: result.comment.comment,
        },
      })).catch((error) => next(error));
  }
}

module.exports = CommentsController;

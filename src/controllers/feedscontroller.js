class FeedController {
  constructor(Model) {
    this.model = new Model();
    this.fetchFeed = this.fetchFeed.bind(this);
  }

  organize(data){
    /*Sorting function*/
    return data.sort((a,b)=>b.created_on-a.created_on)
  }

  async fetchFeed(request, response, next) {
    return this.model.join("articles", "gifs")
    .then((data) => {
      return response.status(200).json({
        status: "success",
        data: this.organize(data)
      })
    }).catch((error)=> next(error))
  }
}

module.exports = FeedController;

class FeedController {
  constructor(Model) {
    this.model = new Model();
    this.fetchFeed = this.fetchFeed.bind(this);
  }

  async fetchFeed(request, response, next) {
    return 'Fetching feed';
  }
}

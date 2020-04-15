
function createApp(container){
    const app = container.App
    app.use('/api/v1', container.IndexRoute)
    app.use('/api/v1/feed', container.FeedRoutes)
    app.use('/api/v1/auth', container.AuthRoutes);
    app.use('/api/v1/articles', container.ArticleRoutes);
    app.use('/api/v1/gifs', container.GifRoutes);
    return app
}

module.exports = {
    createApp
}
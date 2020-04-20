const image = {
    title: result.original_filename,
    public_id: result.public_id,
    size: result.bytes,
    imageurl: result.secure_url,
    created_on: result.created_at,
  }

module.exports = (uploader) => {
    return (request, response, next) => {
        return uploader.upload(request)

    }
}
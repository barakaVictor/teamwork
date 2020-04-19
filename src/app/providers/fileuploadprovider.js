module.exports = (c) => {
    c.service("MulterUploader", (c) => new MulterUploader())
    c.service("CloudinaryUploader", (c) => new CloudinaryUploader())
}
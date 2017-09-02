export function uploadWidget(cloudinarySettings, cb) {
    window.cloudinary
        .openUploadWidget(cloudinarySettings, (err, res) => {
            console.error(err);
            cb(res);
        });
}
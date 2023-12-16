export function audioVideoFileFilter(req: Request, file: Express.Multer.File, callback: any) {
    // Extensões comuns de áudio e vídeo
    const allowedExtensions = /\.(mp3|wav|mp4|avi)$/;

    if (!file.originalname.match(allowedExtensions)) {
        return callback(new Error('Apenas arquivos de áudio ou vídeo são permitidos!'), false);
    }

    callback(null, true);
}
import app from "./src/app";
import configs from "./src/utils/configs";
import connectDB from "./src/utils/database";
import logger from "./src/utils/helpers/logger";


async function main() {
    const PORT = configs.port || 3200;
    try {
        await connectDB();
        app.listen(PORT, () => {
            logger(`Server is listening on port ${PORT}`);
            logger(`Access it from http://localhost:${PORT}`);
        });
    } catch (err) {
        logger(`Server is Failed to load \n[ERR]: ${err}`);
    }
}

main();
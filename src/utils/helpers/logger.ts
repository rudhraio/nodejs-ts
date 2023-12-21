import configs from "../configs";

function logger(data: any, mandatory: boolean = true) {
    if (configs?.logger || mandatory) {
        console.log(`\n[time]: ${new Date()} \n${data}`);
    }
}

export default logger;
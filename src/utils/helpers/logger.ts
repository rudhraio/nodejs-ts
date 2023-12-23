import configs from "../configs";

function logger(data: any, mandatory: boolean = false) {
    if (configs?.logger || mandatory) {
        console.log(`\n[time]: ${new Date()} \n${data}`);
    }
}

export default logger;
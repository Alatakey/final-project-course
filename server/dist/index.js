"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
function main() {
    const hello = "Hello, world!";
    console.log("Greeting:", hello);
    console.log("Start Server...");
    (0, app_1.startExpressServer)();
}
main();
//# sourceMappingURL=index.js.map
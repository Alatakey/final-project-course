"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAsync = void 0;
async function testAsync() {
    const text = "Hello";
    const textToCompare = await takesLongTimeAndThenReturns();
    console.log("1.", text);
    console.log("2.", textToCompare);
}
exports.testAsync = testAsync;
async function takesLongTimeAndThenReturns() {
    await sleep(10000);
    return "hello";
}
async function sleep(waitTime) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
}
//# sourceMappingURL=myTest.js.map
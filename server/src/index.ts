import { PI } from "./consts";
import { startExpressServer } from "./app";
import { testAsync } from "./myTest";

function main(): void {
  const hello: string = "Hello, world!";
  console.log("Greeting:", hello);

  console.log("Start Server...");
  startExpressServer();
}

main();

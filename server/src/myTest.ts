export async function testAsync() {
  const text = "Hello";
  const textToCompare = await takesLongTimeAndThenReturns();

  console.log("1.", text);
  console.log("2.", textToCompare);
}

async function takesLongTimeAndThenReturns() {
  await sleep(10000);
  return "hello";
}

async function sleep(waitTime: number) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}

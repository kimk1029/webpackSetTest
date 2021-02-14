const MESSAGE = "hello"
export class Test {
  //??
  private name;
  constructor(name = "") {
    this.name = name;
  }

  async sayHello(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(MESSAGE);
        resolve(MESSAGE)
      }, 1000);
    });
  }
}

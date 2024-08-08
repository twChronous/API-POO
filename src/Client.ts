import express, { Application } from 'express';

export default class MyServer {
  private app: Application;

  constructor() {
    this.app = express(); 

    this.app.get('/', (req, res) => {
      res.status(200).send('Hello World');
    });
  }

  public startServer(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

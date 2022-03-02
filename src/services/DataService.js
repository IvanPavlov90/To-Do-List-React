export class DataService {
  static async getCategories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
  }

  static async getTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000); 
    });
  }
}

export class StorageUtils {
  static setAuthorization(token, keepSession = false) {
    try {
      sessionStorage.removeItem("Authorization");
      localStorage.removeItem("Authorization");
    } catch (e) {
      console.warn(e);
    }

    (keepSession ? localStorage : sessionStorage).setItem("Authorization", token);
  }

  static getAuthorization() {
    return sessionStorage.getItem("Authorization") || localStorage.getItem("Authorization");
  }
}

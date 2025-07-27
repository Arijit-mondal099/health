/**
 * coustome api resopnse massage blue print
 */

class ApiResponse {
  constructor(status, massage = "success", response = {}) {
    this.status = status;
    this.massage = massage;
    this.success = status < 400;
    this.response = response;
  }
}

export { ApiResponse };

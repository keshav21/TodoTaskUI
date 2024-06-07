class TodoApiClient {
    constructor(username, password) {
      this.username = username;
      this.password = password;
      this.baseUrl = 'https://localhost:5000/api/todo';
    }
  
    async fetchData() {
      return this.fetchDataWithMethod('GET', '/get/all');
    }
  
    async createTask(taskData) {
      return this.fetchDataWithMethod('POST', '/create', taskData);
    }
  
    async updateTask(taskData) {
      return this.fetchDataWithMethod('PUT', `/update`, taskData);
    }
  
    async deleteTask(taskId) {
      return this.fetchDataWithMethod('DELETE', `/delete/${taskId}`);
    }

    async cancelTask(taskId) {
        return this.fetchDataWithMethod('POST', `/cancel/${taskId}`);
    }
  
    async fetchDataWithMethod(method, endpoint, bodyData) {
      const basicAuth = btoa(`${this.username}:${this.password}`);
      const url = this.baseUrl + endpoint;
  
      const options = {
        method: method,
        headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include'
      };
  
      if (bodyData) {
        options.body = JSON.stringify(bodyData);
      }
  
      try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  }

  export default TodoApiClient;
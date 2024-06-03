import TodoApiClient from '../client/TodoClient';

describe('TodoApiClient', () => {
  const username = 'admin';
  const password = 'password';
  const baseUrl = 'http://localhost:5000/api/todo';

  beforeEach(() => {
    global.fetch = jest.fn(); 
  });

  afterEach(() => {
    jest.resetAllMocks(); 
  });

  test('fetchData', async () => {
    const todoClient = new TodoApiClient(username, password);
    const expectedUrl = `${baseUrl}/get/all`;
    const mockResponse = [{ id: 1, title: 'Task 1' }];

    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockResponse) });

    const data = await todoClient.fetchData();

    expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
    expect(data).toEqual(mockResponse);
  });

  test('createTask', async () => {
    const todoClient = new TodoApiClient(username, password);
    const taskData = { title: 'New Task' };
    const expectedUrl = `${baseUrl}/create`;
    const mockResponse = { id: 2, title: 'New Task' };

    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockResponse) });

    const data = await todoClient.createTask(taskData);

    expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
    expect(data).toEqual(mockResponse);
  });

  test('updateTask - success', async () => {
    const todoClient = new TodoApiClient(username, password);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 3, title: 'Updated Task' })
    });
    const expectedUrl = `${baseUrl}/update`;
    const taskData = { id: 3, title: 'Updated Task' };
    const data = await todoClient.updateTask(taskData);

    expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
    expect(data).toEqual({ id: 3, title: 'Updated Task' });
  });

  test('deleteTask - success', async () => {
    const todoClient = new TodoApiClient(username, password);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: 'Task deleted successfully' })
    });
    const expectedUrl = `${baseUrl}/delete/4`;
    const taskId = 4;
    const data = await todoClient.deleteTask(taskId);

    expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
    expect(data).toEqual({ message: 'Task deleted successfully' });
  });

  test('cancelTask - success', async () => {
    const todoClient = new TodoApiClient(username, password);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 5, title: 'Cancelled Task' })
    });
    const taskId = 5;
    const expectedUrl = `${baseUrl}/cancel/5`;
    const data = await todoClient.cancelTask(taskId);
    expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
    expect(data).toEqual({ id: 5, title: 'Cancelled Task' });
  });

});

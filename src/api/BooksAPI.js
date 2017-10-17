const api = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
};

const checkStatus = response =>
    (response.status === 200) ? Promise.resolve(response) : Promise.reject(
        new Error(response.statusText));

export const get = (bookId) =>
    fetch(`${api}/books/${bookId}`, {headers}).
        then(checkStatus).
        then(res => res.json()).
        then(data => data.book).
        catch(err => alert(`we have some issue: ${err.name}
        ${err.message}`));

export const getAll = () =>
    fetch(`${api}/books`, {headers}).
        then(checkStatus).
        then(res => res.json()).
        then(data => data.books).
        catch(err => alert(`we have some issue: ${err.name}
        ${err.message}`));

export const update = (book, shelf) =>
    fetch(`${api}/books/${book.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({shelf}),
    }).
        then(res => res.json()).
        catch(err => alert(`we have some issue: ${err.name}
        ${err.message}`));

export const search = (query, maxResults) =>
    fetch(`${api}/search`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query, maxResults}),
    }).
        then(res => res.json()).then(data => data.books).
        catch(err => alert(`we have some issue: ${err.name}
        ${err.message}`));

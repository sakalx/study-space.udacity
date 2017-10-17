// Const
export const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

// Helpers
export const validName = n => n[0].toUpperCase() + n.slice(1).replace(/[A-Z]/g, ' $&');
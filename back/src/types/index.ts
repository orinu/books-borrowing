export type User = {
    _id?: string;
    email: string;
    password: string;
    name: string;
    studentId: string;
  }
  
  export type Book = {
    _id?: string;
    ownerId: string;
    title: string;
    author: string;
    isbn: string;
    imageUrl?: string;
    isAvailable: boolean;
  }
  
  export type BorrowRequest = {
    _id?: string;
    bookId: string;
    ownerId: string;
    borrowerId: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'RETURNED';
  }
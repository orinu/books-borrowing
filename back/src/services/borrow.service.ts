import { BorrowRequestModel } from '../models/borrowRequest.model';
import { BookModel } from '../models/book.model';

export const requestToBorrow = async (bookId: string, borrowerId: string) => {
  const book = await BookModel.findById(bookId);
  if (!book?.isAvailable) {
    throw new Error('Book not available');
  }

  return await BorrowRequestModel.create({
    bookId,
    ownerId: book.ownerId,
    borrowerId,
    status: 'PENDING'
  });
};

export const respondToRequest = async (requestId: string, ownerId: string, accept: boolean) => {
  const request = await BorrowRequestModel.findOne({ _id: requestId, ownerId });
  if (!request) {
    throw new Error('Request not found');
  }

  request.status = accept ? 'ACCEPTED' : 'REJECTED';
  await request.save();

  if (accept) {
    await BookModel.findByIdAndUpdate(request.bookId, { isAvailable: false });
  }

  return request;
};

export const getMyRequests = async (userId: string) => {
  return await BorrowRequestModel
    .find({ borrowerId: userId })
    .populate('bookId')
    .populate('ownerId', 'name email');
};

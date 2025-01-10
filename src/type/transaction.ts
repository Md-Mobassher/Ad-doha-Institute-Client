export interface ITransaction {
  _id?: string;
  offeredCourse: string;
  studentId: string;
  transactionId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

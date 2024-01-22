export const userSchema = {
  name: 'User',
  properties: {
    _id: 'objectId',
    name: 'string',
    wallet_address: 'string',
    email: 'string',
    notifications: 'Notification[]',
    transactionHistory: 'Transaction[]',
    createdAt: 'date',
  },
  primaryKey: '_id',
};

export const notificationSchema = {
  name: 'Notification',
  properties: {
    category: 'string',
    createdAt: 'date',
    message: 'string',
  },
};

export const transactionSchema = {
  name: 'Transaction',
  properties: {
    transaction_hash: 'string',
    transaction_url: 'string',
    createdAt: 'date',
  },
};

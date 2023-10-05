import { Client, Account, Databases } from 'appwrite';

export const PROJECT_ID = '651d6124dc40c47f6c67';
export const DATABASE_ID = '651d764fa252c5ef7478';
export const COLLECTION_ID_MESSAGES = '651d76584e6d104419ee';

// AppWrite client config setup
const client = new Client();

export const account = new Account(client);
export const databases = new Databases(client);

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('651d6124dc40c47f6c67');

export default client;

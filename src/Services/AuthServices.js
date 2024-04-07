import { Client, Account } from "appwrite";
const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65a573149e6e65ece3a8');
const account = new Account(client);
export default account;
// import * as types from './mutation-types';
// // import Storj from 'storj.js';
// import {
//   authenticateWithBasicAuth,
//   registerKey,
//   authenticateWithKeyPairAuth
// } from '@/utils/storj';

// /**
//  * Creates a new user on storj
//  */
// export const signupUser = ({ commit, state }, credentials) => {
//   return new Promise((resolve, reject) => {
//     console.log('ACTION: signupUser', credentials);
//   });
// };

// /**
//  * Logs a user in with basic auth and sets the user.email to state
//  */
// export const loginUser = ({ commit, state }, credentials) => {
//   return new Promise((resolve, reject) => {
//     console.log('ACTION: loginUser', credentials);

//     authenticateWithBasicAuth(credentials).then((storj) => {
//       commit(types.SET_USER, credentials.email);
//       return resolve(storj);
//     })
//     .catch((err) => reject(err));
//   });
// };

// /**
//  * Authenticates the user with a key pair and sets the private key to state
//  */
// export const authenticateWithKeyPair = ({ commit, state }, storj) => {
//   return new Promise((resolve, reject) => {
//     console.log('ACTION: keypairAuth');
//     const keypair = storj.generateKeyPair();

//     registerKey(storj, keypair)
//       .then(() => authenticateWithKeyPairAuth(keypair))
//       .then((newStorj) => {
//         commit(types.SET_PRIVATE_KEY, keypair.getPrivateKey());
//         return resolve(newStorj);
//       })
//       .catch((err) => reject(err));
//   });
// };

// /**
//  * Verifies the private key is actually a private key
//  */
// export const verifyPrivateKey = ({ commit, state }, privateKey) => {
//   console.log('ACTION: verifyPrivateKey', privateKey);
//   // TODO: write code to get public keys for private key
// }

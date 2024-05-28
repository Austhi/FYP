import dotenv from 'dotenv';

dotenv.config();

let medicalUrl = '';
let transversalUrl = '';
let aiUrl = '';

const localParam = process.env.LOCAL || 'false';

if (localParam === 'false') {
  medicalUrl = 'http://medical:3335';
  transversalUrl = 'http://transversal:3334';
  aiUrl = 'http://transversal:3333';
} else {
  medicalUrl = 'http://0.0.0.0:3335';
  transversalUrl = 'http://127.0.0.1:3334';
  aiUrl = 'http://127.0.0.1:3333';
}

console.log(medicalUrl, transversalUrl, aiUrl)

export { medicalUrl, transversalUrl, aiUrl };
import dotenv from 'dotenv';

dotenv.config();

let medicalUrl = '';
let transversalUrl = '';

const localParam = process.env.LOCAL || 'false';

if (localParam === 'false') {
  medicalUrl = 'http://medical:3335';
  transversalUrl = 'http://transversal:3334';
} else {
  medicalUrl = 'http://0.0.0.0:3335';
  transversalUrl = 'http://127.0.0.1:3334';
}

console.log(medicalUrl, transversalUrl)

export { medicalUrl, transversalUrl };
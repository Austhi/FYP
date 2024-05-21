let medicalUrl = ''
let transversalUrl = ''

let customParam = 'false'

if (customParam === 'false') {
  medicalUrl = 'http://medical:3335';
  transversalUrl = 'http://transversal:3334';
} else {
  medicalUrl = 'http://0.0.0.0:3335';
  transversalUrl = 'http://127.0.0.1:3334';
}

export {medicalUrl, transversalUrl}
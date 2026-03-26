try {
  const app = require('./src/app');
  console.log('App loaded without syntax errors.');
  process.exit(0);
} catch (e) {
  console.error(e);
  process.exit(1);
}

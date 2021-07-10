setTimeout(() => {
  console.log('Two seconds are up');
}, 2000);

const names = ['Mark', 'Daniel', 'Matthew'];

const shortNames = names.filter(name => name.length <= 4);

console.log(shortNames);
// const square = function (x) {
//   return x * x;
// }

// const square = x => x * x;

// console.log(square(2));

// const event = {
//   name: 'Birthday',
//   printGuestList: function () {
//     console.log(`Guest list for ${this.name}`);
//   }
// }

// More concise...
const event = {
  name: 'Birthday',
  guestList: ['Mark', 'Dan', 'Matt'],
  printGuestList() {
    console.log(`Guest list for ${this.name}`);
    this.guestList.forEach((guest) => {
      console.log(`${guest} is attending ${this.name}`);
    })
  }
}

event.printGuestList();







fetch("http://localhost:3000/weather?").then((res) => {
  res.json().then((data) => {
    if (data.errorMessage) {
      console.log(data.errorMessage);
    } else {
      console.log(data.location);
      console.log(data.temperature);
    }
  });
});

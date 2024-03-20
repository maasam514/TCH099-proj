document.getElementById("matchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data); 
    form.reset(); 
  });
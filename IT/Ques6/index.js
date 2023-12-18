let form=document.querySelector(".my-form");
form.addEventListener("submit",(event)=>{
    event.preventDefault();

    const data=new FormData(form);
    const formData = Object.fromEntries(data);

    const pet = {
        "name":formData["name"],
        "age":formData["age"],
        "weight":formData["weight"],
        "type":formData["type"],
        "likes":formData["likes"]
    }

    console.log(pet)
    console.log(JSON.stringify(pet))

});
document.querySelector("#newPostButton").addEventListener("click",event=>{
    event.preventDefault();
    console.log("clicked");
    location.replace(`/newPost`);
})


document.querySelector("#logoutButton").addEventListener("click",event=>{
    event.preventDefault();
    location.replace(`/`);
})

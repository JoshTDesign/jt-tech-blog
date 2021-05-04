// document.querySelector("#postButton").addEventListener("click",event=>{
//     event.preventDefault();
//     console.log("posted");
// })
// document.querySelector("#cancelButton").addEventListener("click",event=>{
//     event.preventDefault();
//     console.log("cancelled");
// })


document.querySelector("#postFormButton").addEventListener("click",event=>{
    event.preventDefault();
    console.log('click');
    const newPostObj = {
        title:document.querySelector("#newTitle").value,
        content:document.querySelector("#newContent").value,
    }
    // console.log(newPostObj);
    // location.replace("/profile");
    fetch("/newpost",{
        method:"POST",
        body:JSON.stringify(newPostObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        console.log(res);
        if(res.ok){
            console.log("signed up successfully!")
            location.replace("/profile")
        } else {
            alert("new posting failed!")
            location.reload();
        }
    })
})

// })
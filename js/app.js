// if (navigator.serviceWorker) {
//     navigator.serviceWorker.register("./sw.js");
// }

import { getAllUsersFire, createUserFire,deleteUserFire,createObservationFire } from "/users/js/firebase-functions.js";
import {getStorage,ref, uploadBytes,getDownloadURL, uploadBytesResumable} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { app } from "/users/js/firebase.js";
const storage = getStorage(app);
const getAllUsers = () => {
  getAllUsersFire();
};



const textModal = document.getElementById("textModal");






const saveUser = async () => {


 const file = document.querySelector("#image").files[0];
  const name = file.name;
 const storageRef  = ref(storage, "images/"+name);

  
const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed',
  (snapshot) => {
 
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => {
  },
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      console.log("Entra crear usuario")
  const user = {
    name: "",
    lastName : "",
    position : "",
    address : "",
    city : "",
    state : "",
    phone : "",
    mail : "",
    image : "",
    created_at: new Date(),
  };

  const txtName = document.getElementById("txtName");
  const lastName = document.getElementById("lastNameNew");
  const position = document.getElementById("positionNew");
  const address = document.getElementById("addressNew");
  const city = document.getElementById("cityNew");
  const state = document.getElementById("stateNew");
  const phone = document.getElementById("phoneNew");
  const mail = document.getElementById("mailNew");
  var  img=downloadURL;
  
  user.name = txtName.value;
  user.lastName = lastName.value,
  user.position = position.value,
  user.address = address.value,
  user.city = city.value,
  user.state = state.value,
  user.phone = phone.value,
  user.mail = mail.value,
  user.image = img

  
  const generatedId =  createUserFire(user);
  if (generatedId != "no-created") {
    txtName.value = "";
    Toastify({
      text: "Usuario creado exitosamente!",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    alert("Usuario no creado");
  }

    });
  }
);


setTimeout(() => {location.reload() }, 3000);


};




const btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", saveUser);


getAllUsers();

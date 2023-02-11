import {
  collection,query,where,getDocs,getFirestore,addDoc,doc,updateDoc,limit,startAfter, startAt,orderBy, deleteDoc
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { app } from "/users/js/firebase.js";

const db = getFirestore(app);

const q = query(collection(db, "users"), orderBy("created_at"));
const o = query(collection(db, "observations"), orderBy("date"));
var users = document.getElementById("users");
var observations = document.getElementById("observation");
var idUser = "";
var idObservation = "";




const getAllUsersFire = async () => {

  
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const newUser= document.createElement("div");
    newUser.className = "col col-lg-4";
    newUser.innerHTML += `

    <br>
    <br>
    <div class="card" style="width: 18rem;" data-bs-toggle='modal' data-bs-target='#exampleModal'>
    <img src="${doc.data().image}" class="card-img-top" alt="...">
    <div class="card-body" >
      <h5 class="card-title">${doc.data().name} ${doc.data().lastName}  </h5>
      <h6 class="card-subtitle mb-2 text-muted">${doc.data().alias} </h6>
      <div style="text-align:right;" data-bs-toggle='modal' data-bs-target='#observationsModal' >  

    </div>
    
    </div>
    </div>


    
    `;
  newUser.addEventListener("click", () => {
        console.log(doc.data().name);
        idUser= doc.id;
        document.getElementById("textModal").value = doc.data().name;
        document.getElementById("lastName").value = doc.data().lastName;
        document.getElementById("alias").value = doc.data().alias;
        document.getElementById("position").value = doc.data().position;
        document.getElementById("address").value = doc.data().address;
        document.getElementById("city").value = doc.data().city;
        document.getElementById("state").value = doc.data().state;
        document.getElementById("phone").value = doc.data().phone;
        document.getElementById("mail").value = doc.data().mail;
        document.getElementById("imageUser").src = doc.data().image;



        console.log(idUser);
      });

      

  newUser.innerHTML += `

  

  <button data-bs-toggle='modal'   data-bs-target='#observationsModal' class="btn btn-success" >Observations</button>


  
  `;    


  newUser.addEventListener("click", () => {
       
    getObservations(idUser);
 });
  
      users.append(newUser);


  });



};



const saveObservation = async () => {
  const note = {
    observation: "",
    user: idUser,
    date: new Date(),
  };

  const observation = document.getElementById("note");
  console.log("valor " + note);

  note.observation = observation.value;
  const generatedId = await createObservationFire(note);
  if (generatedId != "no-created") {
    observation.value = "";
    Toastify({
      text: "Nota creada exitosamente!",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    alert("Nota no creada ");
  }
  modal.innerHTML = ""

};

const btnObservation = document.getElementById("saveNote");
btnObservation.addEventListener("click", saveObservation);




const getObservations = async (idUser) => {
  
  const queryObservation = query(o, where("user", "==", idUser));
  const querySnapshot = await getDocs(queryObservation);
  querySnapshot.forEach((doc) => {

    console.log(doc.id, " => ", doc.data());
    const newObservation= document.createElement("div-observations");
    
    var timeStamp = doc.data().date.toDate();
    var date = new Date(timeStamp);
    var day = "";
    var month = "";

    switch (date.getDay()) {
      case 1:
        
        break;

        case 1:

        day = "Monday";
        
        break;

        case 2:
          day = "Tuesday";

        break;

        case 3:
          day = "Wednesday";

        break;

        case 4:
          day = "Thursday";

        break;

        case 5:
          day = "Friday";

        break;

        case 6:
          day = "Saturday";

        
        break;

        case 7:
          day = "Sunday";

        
        break;
    
      default:
        break;
    }
    switch (date.getMonth()) {
  

        case 1:

        month = "January";
        
        break;

        case 2:
          month = "February";

        break;

        case 3:
          month = "March";

        break;

        case 4:
          month = "April";

        break;

        case 5:
          month = "May";

        break;

        case 6:
          month = "June";

        
        break;

        case 7:
          month = "July";

        
        break;

        case 8:
          month = "August";

        
        break;

        case 9:
          month = "September";

        
        break;

        case 10:
          month = "October";

        
        break;

        case 11:
          month = "November";

        
        break;

        case 12:
          month = "December";

        
        break;
    
    
      default:
        break;
    }

    newObservation.style ="text-align: center;";
    newObservation.innerHTML += `
    <div class="card" style="text-align: center;">
    <div class="card-body" >
    <div style="text-align: left;">
    <p class="card-title" style="text-align: right;">${date.getDay()}/${date.getMonth()}/${date.getFullYear()} </p>

    </div>
    <h5 class="card-title">${doc.data().observation} </h5>

    </div>
    </div>

    
    `;
    newObservation.addEventListener("click", () => {
        document.getElementById("textModal").value = doc.data().name;
        document.getElementById("lastName").value = doc.data().lastName;
        console.log(idObservation);

      });

    const newButton= document.createElement("button");
    newButton.className="btn btn-close btn-sm";
    newButton.setAttribute("data-bs-dismiss","modal");
 

    newButton.addEventListener("click", () => {
      idObservation= doc.id;
      deleteObservation(idObservation);
     });
  
    observations.append(newButton);
    observations.append(newObservation);
      
  });

 

};
 
const modal = document.getElementById("observation");

function clean(){
  modal.innerHTML = ""
}

const close = document.getElementById("closeObservations");
close.addEventListener("click", () => {
  console.log("click");
clean();
});

const closeAdd = document.getElementById("closeAdd");
closeAdd.addEventListener("click", () => {
  console.log("click");
clean();
});

const closeUpdate = document.getElementById("closeUpdate");
closeUpdate.addEventListener("click", () => {
  console.log("click");
clean();
});














const createUserFire = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return docRef.id;
  } catch (error) {
    return "no-created";
  }
};

const createObservationFire = async (observation) => {
  try {
    const docRef = await addDoc(collection(db, "observations"), observation);
    return docRef.id;
  } catch (error) {
    return "no-created";
  }
};

function updateUser() {
  const docRef = doc(db, "users", idUser);
  var textModal = document.getElementById("textModal");
  var lastName = document.getElementById("lastName");
  var alias = document.getElementById("alias");
  var position = document.getElementById("position");
  var address = document.getElementById("address");
  var city = document.getElementById("city");
  var state = document.getElementById("state");
  var phone = document.getElementById("phone");
  var mail = document.getElementById("mail");
  var image = document.getElementById("imageUser").src;

  console.log(image);


  const data = {
    name: textModal.value,
    lastName : lastName.value,
    alias : alias.value,
    position : position.value,
    address : address.value,
    city : city.value,
    state : state.value,
    phone : phone.value,
    mail : mail.value,
    image : image
  };

  updateDoc(docRef, data)
    .then((docRef) => {
      location.reload();
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
}



const edit = document.getElementById("edit");
edit.addEventListener("click", () => {
  updateUser();
  if (updateUser) {
    Toastify({
      text: "Usuario actualizado exitosamente",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
});


const deleteUserFire = async (idUser) => {
  try {
    await deleteDoc(doc(db, "users", idUser));
    return  "deleted";
  } catch (error) {
    return "no-deleted";
  }
};

const deleteUser = async () => {
 

  const generatedId = await  deleteUserFire(idUser);
  if (generatedId != "no-deleted") {
    Toastify({
      text: "Usuario eliminado exitosamente!",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    alert("Usuario no eliminado");
  }


  
setTimeout(() => {location.reload() }, 2000);

  modal.innerHTML = "";


}
const btnDelete = document.getElementById("delete");
btnDelete.addEventListener("click", deleteUser);


const deleteObservationFire = async (idObservation) => {
  try {
    await deleteDoc(doc(db, "observations", idObservation));
    return  "deleted";
  } catch (error) {
    return "no-deleted";
  }
};

const deleteObservation = async () => {
 

  const generatedId = await  deleteObservationFire(idObservation);
  if (generatedId != "no-deleted") {
    Toastify({
      text: "Nota eliminada exitosamente!",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    alert("Nota no eliminada");
  }
  modal.innerHTML = "";

}








export { getAllUsersFire, createUserFire,deleteUserFire, createObservationFire };

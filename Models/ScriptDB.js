//import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getStorage, ref, getDownloadURL }from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, deleteDoc, deleteField, query, where, getDocs }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfVMTvk37mEsYBUwRWIEGdY52WUnHRpAo",
    authDomain: "liquor-store-9c0d9.firebaseapp.com",
    projectId: "liquor-store-9c0d9",
    storageBucket: "liquor-store-9c0d9.appspot.com",
    messagingSenderId: "743260586080",
    appId: "1:743260586080:web:181791566ebd34a3878305",
    measurementId: "G-W8YWBF13T7"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();

// variables usuario
let nombre_usuario = [];
let apellido_usuario = [];
let correo_usuario = [];
let estado_cuenta = [];

// cargar Usuarios
const q = query(collection(db, "users"), where("correo", "!=", ''));
const querySnapshot = await getDocs(q);
var cont = -1;
querySnapshot.forEach((doc) => {
  cont += 1;
  nombre_usuario[cont] = doc.data().nombre;
  apellido_usuario[cont] = doc.data().apellido;
  correo_usuario[cont] = doc.data().correo;
  estado_cuenta[cont] = doc.data().state;
});

// botones dropdown
let inicioBtn = document.getElementById('boton_inicio_admin');
let usuariosBtn = document.getElementById('boton_usuarios_admin');
let configuracionBtn = document.getElementById('boton_configuracion_admin');
let salirBtn = document.getElementById('boton_salir_admin');

// panels
let inicioPane = document.getElementById('panel_inicio_admin');
let usuariosPane = document.getElementById('panel_usuarios_admin');
let body_tabla_usuarios = document.getElementById('body_tabla_usuarios');

// eventos
//inicioBtn.addEventListener('click', event =>{inicioPane.hidden = false;usuariosPane.hidden = true;});
//usuariosBtn.addEventListener('click', event =>{inicioPane.hidden = true;usuariosPane.hidden = false;});
//salirBtn.addEventListener('click', event => {sessionStorage.removeItem("usuario");location.replace('index.html');})

function tabla_usuarios(){
    if(nombre_usuario.length != 0){
        $("#textempty").hide();
      }else{
        $("#textempty").show();
      }
    for (let i = 0; i < nombre_usuario.length; i++) {
        // Crea las hileras de la tabla
        let row = document.createElement("tr");
    
        for (let j = 0; j < 6; j++) {
          // Crea un elemento <td> y un nodo de texto, haz que el nodo de
          // texto sea el contenido de <td>, ubica el elemento <td> al final
          // de la hilera de la tabla
          let celda = document.createElement("td");
          let textoCelda = document.createTextNode(i+1);
          let textoCelda1 = document.createTextNode(nombre_usuario[i]);
          let textoCelda3 = document.createTextNode(apellido_usuario[i]);
          let textoCelda2 = document.createTextNode(correo_usuario[i]);
          let boton_eliminar_usuario = document.createElement("a");
          let boton_acti_usuario = document.createElement("b");
          let boton_des_usuario = document.createElement("c");
          boton_des_usuario.setAttribute('href','#');
          boton_des_usuario.setAttribute('class','boton_des_usuario_class btn bg-danger fa fa-lock');
          boton_acti_usuario.setAttribute('href','#');
          boton_acti_usuario.setAttribute('class','boton_acti_usuario_class btn bg-info fa fa-unlock');
          boton_eliminar_usuario.setAttribute('href','#');
          boton_eliminar_usuario.setAttribute('class','boton_eliminar_usuario_class btn bg-danger fas fa-user-times');
          if (j == 0){
            celda.appendChild(textoCelda);
            row.appendChild(celda);
          }
          if (j == 1){
            celda.appendChild(textoCelda1);
            row.appendChild(celda);
          }
          if (j == 2){
            celda.appendChild(textoCelda3);
            row.appendChild(celda);
          }
          if (j == 3){
            celda.appendChild(textoCelda2);
            row.appendChild(celda);
          }
          if (j == 4){
            let cont3 = i + 1;
            boton_eliminar_usuario.setAttribute('id','boton_eliminar_usuario_'+ cont3)
            celda.appendChild(boton_eliminar_usuario);
            row.appendChild(celda);
          }
          if (j == 5){
            let cont4 = i + 1;
            boton_des_usuario.setAttribute('id','boton_des_usuario_'+ cont4)
            boton_acti_usuario.setAttribute('id','boton_acti_usuario_'+ cont4)
            if(estado_cuenta[i] == 'activo'){
              celda.appendChild(boton_des_usuario);
            }else{
              celda.appendChild(boton_acti_usuario);
            }
            row.appendChild(celda);
          }
          let cont = i+1
          row.id = 'fila_'+cont
        }
    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        body_tabla_usuarios.appendChild(row);
      }
}
tabla_usuarios();

document.getElementById('boton_actualizar_lista').addEventListener('click', event => {
  location.reload();
});

document.querySelectorAll('.boton_eliminar_usuario_class').forEach(item => {
    item.addEventListener('click', event => {
      Swal.fire({
        title: 'Eliminar usuario?',
        text: "El usuario "+nombre_usuario[item.id.substr(23,24)-1].toUpperCase()+" será eliminado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          DeleteUser(correo_usuario[item.id.substr(23,24)-1]);
        }
      })
    })
});

document.querySelectorAll('.boton_acti_usuario_class').forEach(i => {
  i.addEventListener('click', event => {
    Updatestate(correo_usuario[i.id.substr(19,20)-1]);
  })
});
document.querySelectorAll('.boton_des_usuario_class').forEach(i => {
  i.addEventListener('click', event => {
    Updatestate(correo_usuario[i.id.substr(18,19)-1]);
  })
});
async function Updatestate(correo){
  var ref = doc(db, "users", correo );
  const docSnap = await getDoc(ref);
  let estado = 'activo';
  if(docSnap.data().state=='activo')estado='des';
  await updateDoc(
      ref, {
        state: estado
      }
  )
  .then(()=>{
      Swal.fire('Éxito!','Stado actualizado','success');
      refresh();
  })
  .catch((error)=>{
      Swal.fire('Error! ', error ,'error');
  }); 
}

function refresh(){
  location.reload();
}

// variables usuario activo
let adminID = 'admin@correo.com';
//funciones firebase
async function cargarNombre(){
  let ref = doc(db, "admins", adminID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()){
    document.getElementById('label_nombre_admin').innerHTML = docSnap.data().nombre;
  } else {
      Swal.fire('Error!','Usuario no encontrado','error');
  }
}
cargarNombre();
async function UpdateFieldsDocument(id){
  var ref = doc(db, "users", id);

  await updateDoc(
      ref, {
          //item: field
      }
  )
  .then(()=>{
      Swal.fire('Éxito!','Datos actualizados','success');
  })
  .catch((error)=>{
      Swal.fire('Error! ', error ,'error');
  }); 
}
async function UpdatePassword(id){
  var ref = doc(db, "users", id);
  await updateDoc(
      ref, {
          //password_item_name: password_field
      }
  )
  .then(()=>{
    Swal.fire('Éxito!','Contraseña actualizada','success');
  })
  .catch((error)=>{
    Swal.fire('Error!', error ,'error');
  }); 
}
async function DeleteUser(id){
  let ref = doc(db, "users", id);
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()){
    Swal.fire('Error!','Usuario no existe','error');
    return;
  }await deleteDoc(ref)
  .then(()=>{
    Swal.fire('Éxito!','Usuario eliminado','success');
    refresh() 
  })
  .catch((error)=>{
    Swal.fire('Error!',error,'error');
  }); 
}
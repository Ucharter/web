import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { getStorage, ref, uploadBytes , getDownloadURL }from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
import {getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfVMTvk37mEsYBUwRWIEGdY52WUnHRpAo",
    authDomain: "liquor-store-9c0d9.firebaseapp.com",
    projectId: "liquor-store-9c0d9",
    storageBucket: "liquor-store-9c0d9.appspot.com",
    messagingSenderId: "743260586080",
    appId: "1:743260586080:web:181791566ebd34a3878305",
    measurementId: "G-W8YWBF13T7"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const mauth = getAuth();
const db = getFirestore();

//Variables
let input_correo = document.getElementById('input_correo_inicio');
let input_password = document.getElementById('input_password_inicio');
let label_usuario_activo = document.getElementById('nombre_usuario');
let id_usuario_activo = sessionStorage.getItem("usuario");
let Cadmin="admin@correo.com";
var name='' 

// botones
let boton_iniciar_sesion = document.getElementById('boton_iniciar_sesion');

// eventos
boton_iniciar_sesion.addEventListener('click', event => {
    iniciarSesionAdmin();
})

//Funciones
async function iniciarSesionAdmin(){
    if(input_correo.value == Cadmin){
        var ref = doc(db, "admins", input_correo.value);
        const docSnap = await getDoc(ref);
        if(docSnap.data().password == input_password.value){
            sessionStorage.setItem("usuario",docSnap.data().correo);
            location.replace('Views/admin.html');
        } else {
            Swal.fire("Error","Contraseña incorrecta","error");
        }  
    }else{
        iniciarSesionUser();
    }
}

async function iniciarSesionUser(){
    const correo = input_correo.value;
    const password = input_password.value;
    var ref = doc(db, "users", correo);
    const docSnap = await getDoc(ref);
    signInWithEmailAndPassword(mauth,correo,password).then(()=>{
      if (docSnap.exists()==false){
        Swal.fire('Error!','Usuario no encontrado','error');
      }else{
        if(docSnap.data().state == 'activo'){
          sessionStorage.setItem("usuario", docSnap.data().correo);
          location.replace('Index.html');
        }else{
          Swal.fire("Error","Usuario desactivado","error");
        }
      }
    }).catch((e)=>{
      if (docSnap.exists()==false)Swal.fire('Error!','Usuario no encontrado','error');
      if(docSnap.data().password != input_password)Swal.fire("Error","Contraseña incorrecta","error");
  
    })
}

async function cargarDatos(){
    var ref = doc(db, "users", id_usuario_activo);
    const docSnap = await getDoc(ref);
  
    if (docSnap.exists()){
      name = docSnap.data().nombre.split(" ",2);
      label_usuario_activo.innerHTML = name.toString().replace(","," ");
      if(name.toString().replace(","," ") == 'admin'){
        $("#pagadmin").show();
      }
    } else {
      var ref = doc(db, "admins", id_usuario_activo);
      const docSnap2 = await getDoc(ref);
      if(docSnap2.exists()){
        name = docSnap.data().nombre.split(" ",2);
        label_usuario_activo.innerHTML = name.toString().replace(","," ");
        $("#pagadmin").show();
      }else{
        Swal.fire('Error!','Usuario no encontrado','error');
      }
    }
  }

cargarDatos();

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
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
const mauth = getAuth();
const db = getFirestore();

//variables
let input_correo = document.getElementById('input_correo_registro');
let input_apellido = document.getElementById('input_apellido_registro');
let input_password1 = document.getElementById('input_password1_registro');
let input_password2 = document.getElementById('input_password2_registro');
let input_nombre = document.getElementById('input_nombre_registro');
let id_usuario_activo = sessionStorage.getItem("usuario");

//events
$("#btn_cancelar").click(function(){

	if(id_usuario_activo == 'admin@correo.com'){
		window.location.replace('admin.html')
	}else{
		window.location.replace('Index.html')
	}
})

document.getElementById('btn_submit_registro').addEventListener('click', event => {
	if(validarCorreo(input_correo) && validarNombre(input_nombre) && validarPassword(input_password1) && validarCoincida(input_password1,input_password2)
        && validarApellido(input_apellido)){
		validarNuevo();
	} else {
		if (!validarCorreo(input_correo)){
			Swal.fire("","Correo inválido","info");
		}
		if (!validarNombre(input_nombre)){
			Swal.fire("","El nombre es muy corto","info");
		}
		if (!validarPassword(input_password1)){
			Swal.fire("","Contraseña muy corta","info");
		}
        if(!validarApellido(input_apellido)){
            Swal.fire("","El Apellido es muy corto");
        }
        if(!validarCoincida(input_password1,input_password2)){
            Swal.fire("","Las contraseñas no coinciden");
        }
	}
})
function validarCorreo(String){
	let expression = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
	if (expression.test(String.value) == true){
		return true;
	} else {
		return false;
	}
}
function validarPassword(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 7){
			return true;
		} else {
			return false;
		}
	}
}
function validarNombre(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 3){
			return true;
		} else {
			return false;
		}
	}
}
function validarApellido(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 3){
			return true;
		} else {
			return false;
		}
	}
}

function validarCoincida(String1, String2){
	if (String1.value == String2.value) {
		return true;
	} else {
        return false;
	}
}

async function Registro(){ // email
	const correo = input_correo.value;
	const contra = input_password1.value;
	var ref = doc(db, "users", correo);
	createUserWithEmailAndPassword(mauth,correo,contra).then((userCredential)=>{
		const docRef = setDoc(
			ref, {
				correo: input_correo.value,
				nombre: input_nombre.value,
                apellido: input_apellido.value,
				password: input_password1.value,
				state: 'activo'
			}
		)
		.then(()=>{
			if(id_usuario_activo == 'admin@correo.com'){
				window.location.replace('Views/admin.html')
			}else{
				sessionStorage.setItem('usuario',correo);
				window.location.replace('Views/Index.html')
			}
		})
		.catch((error)=>{
			new Swal('Error!', error, 'error');
		});

	}).catch((e)=>{
		new Swal("problemas en el registro",e);
	})
}
async function validarNuevo(){
	var ref = doc(db, "users", input_correo.value);
	const docSnap = await getDoc(ref);
	if (docSnap.exists()){
		Swal.fire("Atención","Ya esxiste una cuenta asociada a éste correo","error");
	} else {
		Registro();
	}
}
function login(form) {
  const elements = form.elements
  var obj = {}

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index]
    obj[element.name] = element.value
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(obj.txt_email, obj.txt_password)
    .catch((e) => {
      console.log(e)
    })
}


function initApp() {
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      g("ui_login").style.display = "none"
      g("ui_ops").style.display = "block"
    }
  })
}

window.onload = initApp()
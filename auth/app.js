(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAylm3TKzgulVjY-9c3OsE5dZ9xhbXJsAg",
    authDomain: "scheduler-base-1cc8c.firebaseapp.com",
    databaseURL: "https://scheduler-base-1cc8c.firebaseio.com",
    projectId: "scheduler-base-1cc8c",
    storageBucket: "scheduler-base-1cc8c.appspot.com",
    messagingSenderId: "56851181447"
  };
  firebase.initializeApp(config);
  
  //get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');
  
  btnLogin.addEventListener('click', e => {
    //get email and pwd
    const email = txtEmail.value;
    const pwd = txtPassword.value;
    const auth = firebase.auth();
    const promice = auth.signInWithEmailAndPassword(email, pwd);
    promice.catch(e => console.log(e.message));
  });

  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    //TODO validation of emails
    const pwd = txtPassword.value;
    const auth = firebase.auth();
    const promice = auth.createUserWithEmailAndPassword(email, pwd);
    promice
      .then(user => console.log(user))
      .catch(e => console.log(e.message));    
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  //Add auth listener
  firebase.auth().onAuthStateChanged(fbUser => {
    if (fbUser){
      console.log(fbUser);
    }else{
      console.log('not logged in');
    }
  });

  }());

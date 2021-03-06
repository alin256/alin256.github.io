(function(){
  // Initialize Firebase
  
  const auth = firebase.auth();
  var lastUser = auth.currentUser;
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
  const labelEmail = document.getElementById('curEmail');
  const labelName = document.getElementById('curName');

  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');
  const btnGoogle = document.getElementById('btnGoogle');
  const btnGitHub = document.getElementById('btnGitHub');
  
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
      .catch(err => console.log(err.message));    
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });


  btnGitHub.addEventListener('click', e => {
    var provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        console.log("githubToken" + token);
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      console.log("githubUser" + user);
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " : "+ errorMessage);
      // The email of the user's account used.
      var email = error.email;
      console.log("error email" + email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

  btnGoogle.addEventListener('click', e => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      //TODO link account
      // https://firebase.google.com/docs/auth/web/account-linking
      // ...
    });
  });

  //Add auth listener
  firebase.auth().onAuthStateChanged(fbUser => {
    if (fbUser){
      console.log(fbUser);
      lastUser = fbUser.uid;
      labelEmail.textContent = fbUser.email;
      labelName.textContent = fbUser.displayName;
      btnLogout.classList.remove('hide');
    }else{
      console.log('not logged in');
      console.log('last user' + lastUser);
      labelEmail.textContent = "nope";
      labelName.textContent = "nope";

      btnLogout.classList.add('hide');
    }
  });

  }());

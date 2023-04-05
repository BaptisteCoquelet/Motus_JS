/*
 _____ ______   ________  ________  ________  ___          
|\   _ \  _   \|\   __  \|\   ___ \|\   __  \|\  \         
\ \  \\\__\ \  \ \  \|\  \ \  \_|\ \ \  \|\  \ \  \        
 \ \  \\|__| \  \ \  \\\  \ \  \ \\ \ \   __  \ \  \       
  \ \  \    \ \  \ \  \\\  \ \  \_\\ \ \  \ \  \ \  \____  
   \ \__\    \ \__\ \_______\ \_______\ \__\ \__\ \_______\
    \|__|     \|__|\|_______|\|_______|\|__|\|__|\|_______|
                                                        
*/


window.onload = function () {
  var modalE = document.getElementById("ModalEnd");
  var modalR = document.getElementById("ModalResult");

/* Faire disparaître le modal lorsque vous cliquez en dehors de celui-ci. */
  window.onclick = function (event) {
    if (event.target == modalE) {
      modalE.style.display = "none";
    }
    if (event.target == modalR) {
      modalR.style.display = "none";
    }
  };
};

function customAlert() {
  this.render = function(header, dialog) {
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let dialogOverlay = document.getElementById('dialogOverlay');
    let dialogBox = document.getElementById('dialogBox');
    dialogOverlay.style.display = "block";
    dialogOverlay.style.height = winH + "px";
    dialogBox.style.left = (winW/2) - (500/2) + "px";
    dialogBox.style.top = "150px";
    dialogBox.style.display = "block";
    
    document.getElementById('dialogBoxHead').innerHTML = header;
    document.getElementById('dialogBoxBody').innerHTML = dialog;
    document.getElementById('dialogBoxFoot').innerHTML = '<button onclick="Alert.ok()" style="padding: 2px 6px 1px;">OK</button>';
  }
  
  this.ok = function() {
    document.getElementById('dialogBox').style.display = "none";
    document.getElementById('dialogOverlay').style.display = "none";
  }
}

var Alert = new customAlert();

function customConfirm() {
  
  this.render = function(dialog, callback, id) {
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let dialogOverlay = document.getElementById('dialogOverlay');
    let dialogBox = document.getElementById('dialogBox');
    dialogOverlay.style.display = "block";
    dialogOverlay.style.height = winH + "px";
    dialogBox.style.left = (winW/2) - (500/2) + "px";
    dialogBox.style.top = "150px";
    dialogBox.style.display = "block";

    this.callback = callback;
    this.id = id;
    document.getElementById('dialogBoxHead').innerHTML = 'Please confirm the action';
    document.getElementById('dialogBoxBody').innerHTML = dialog;
    document.getElementById('dialogBoxFoot').innerHTML = '<button onclick="Confirm.yes()" style="padding: 2px 6px 1px;">Yes</button>'+ 
      '&nbsp;&nbsp;&nbsp;<button onclick="Confirm.no()" style="padding: 2px 6px 1px;">No</button>';
  }
  
  this.no = function() {
    document.getElementById('dialogBox').style.display = "none";
    document.getElementById('dialogOverlay').style.display = "none";
  }

  this.yes = function() {
    this.callback(this.id);
    document.getElementById('dialogBox').style.display = "none";
    document.getElementById('dialogOverlay').style.display = "none";
  }
}

var Confirm = new customConfirm();

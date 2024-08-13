// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYtN8JIcKO3eKb72vPksf1BsjYVizkH9g",
    authDomain: "task-manager-d385f.firebaseapp.com",
    databaseURL: "https://task-manager-d385f-default-rtdb.firebaseio.com",
    projectId: "task-manager-d385f",
    storageBucket: "task-manager-d385f.appspot.com",
    messagingSenderId: "802490153269",
    appId: "1:802490153269:web:b027cedac006110b0c347c",
    measurementId: "G-H5CSEV6JMF"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var totalItems
var maxCode
var code

function storeTask(event) {
    event.preventDefault();

    //get data entered by user
    var task = document.getElementById("task").value;
    var desc = document.getElementById("desc").value;
    document.getElementById("task").value = "";
    document.getElementById("desc").value = "";
    
    code = totalItems
    if (totalItems < maxCode) {
        code = maxCode + 1
    }

    firebase.database().ref("Tasklist" + code).set({
        taskName: task,
        descName: desc,
        status : "Pending",
    })

    //update total items
    firebase
        .database()
        .ref("totalItems")
        .update({
            totalItems: totalItems + 1,
            maxCode: maxCode + 1
        });
    
    if (document.getElementById("info") != null) {
        document.getElementById("info").remove();
    }

    // Show the data in the body in form of card
  document.getElementById("tasks-header").insertAdjacentHTML(
    "afterend",
    `<div class="Task-item" id="${code}">
    <div class="data" id="${task}">
        <button id="done" class="done" onclick = "changeStatus('${code}')"><i class="far fa-check-circle"></i></button>
        <h2 class="Task">${task}</h2>
        <p class="desc">${desc}</p>
        <small id = "status"></small>
    </div>
    <hr>
    <div class="buttons">
        <button class="button edit" id="editbtn" onclick = "editData('${code}')"><i class="fas fa-edit"></i> EDIT TASK</button>
        <button class="button delete" id="deletebtn" onclick = "deleteData('${code}')">
        <i class="fas fa-trash-alt"></i>DELETE TASK</button>
    </div>
    
    </div>`
  );
}

var data;
firebase
  .database()
  .ref("TaskList")
  .on("value", function (snapshot) {
    data = snapshot.val();
    console.log("This is data speaking from open");
    console.log(data);
  });
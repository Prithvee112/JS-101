let addbtn = document.getElementById("add-btn");
let addtitle = document.getElementById("note-title");
let addtext = document.getElementById("note-text");
addbtn.addEventListener("click", (e) => {
    if (addtitle.value == "" || addtext.value == "") {
        return alert("Please add note title and details");
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addtext.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",
        JSON.stringify(notesObj));
    addtitle.value = "";
    addtext.value = "";
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `<div id="note">
                    <p class="note-counter">Note ${index+1}</p>
                    <h3 class="note-title">${element.title}</h3>
                    <p class="note-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
                    <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
                    <hr class="spacing"/>
                </div>`;
    });
    let noteEle = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteEle.innerHTML = html;
    } else {
        noteEle.innerHTML = "No notes yet! Add a notes using the form above";
    }
}

function deleteNote(index) {
    let confirmdel = confirm("You are deleting this note!!");
    if (confirmdel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (addtitle.value != "" || addtext.value != "") {
        return alert("Please clear the form before editting a note.");
    }
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    // console.log(notesObj);
    notesObj.findIndex((element, index) => {
        addtitle.value = element.title;
        addtext.value = element.text;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
showNotes();
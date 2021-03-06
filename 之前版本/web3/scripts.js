
let tasks = [];




function renderEditor() {
  let inputEl = document.querySelector("#default--todo--panel .todo--editor > input");
  //inputEl.onchange = (e) =>{
  //  console.log("text,",e.target.value);
  // console.log("input change:",e);
  // }

  let addTask = () => {
    if (inputEl.value.length == 0) {
      return;
    }
    let newTask = {
      title: inputEl.value,
      done: false,
    };

    inputEl.value = "";

    tasks.push(newTask);


    console.log("tasks:", tasks);

    renderTaskItems();
  }

  inputEl.onkeypress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  }

  let addEl = document.querySelector("#default--todo--panel .todo--editor > button");

  addEl.onclick = (e) => {
    addTask();
  };
}

function renderTaskItems() {
  let itemsEl = document.querySelector("#default--todo--panel .todo--items");

  itemsEl.querySelectorAll("div").forEach((node) => node.remove());

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let itemEl = document.createElement("div");
    itemEl.className = "task";


    let doneEL = document.createElement("input");
    doneEL.type = "checkbox";
    if (task.done) {
      itemEl.classList.add("done");
    } else {
      itemEl.classList.remove("done");
    }

    doneEL.checked = task.done;
    doneEL.onchange = (e) => {
      task.done = e.target.checked;
      if (task.done) {
        itemEl.classList.add("done");
      } else {
        itemEl.classList.remove("done");
      }
    }
    itemEl.append(doneEL);

    let titleEL = document.createElement("label");
    titleEL.innerText = task.title;
    itemEl.append(titleEL);

    let ctrbarEL = document.createElement("div");
    ctrbarEL.className = "ctrlbar";


    let cancelEL = document.createElement("button");
    cancelEL.innerText = "X";
    cancelEL.onclick = () => {
      tasks.splice(i, 1);
      renderTaskItems();
    };
    
    itemEl.append(cancelEL);

    itemsEl.append(itemEl);
  }
}

renderEditor();
renderTaskItems();
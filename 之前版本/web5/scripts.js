
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

    let ctrbarEL = renderTaskCtrlBar(task, i,itemEl);
  
    itemEl.append(ctrbarEL);

    itemsEl.append(itemEl);
  }
}

function renderTaskCtrlBar(task, taskIdx,itemEl) {
  let ctrbarEL = document.createElement("div");
  ctrbarEL.className = "ctrlbar";

  let upEL = document.createElement("button");
  if (taskIdx === 0) {
    upEL.disabled = true;
  }
  upEL.innerText = "🠕";
  ctrbarEL.append(upEL);

  let downEL = document.createElement("button");
  downEL.innerText = "🠗";
  ctrbarEL.append(downEL);

  let cancelEL = document.createElement("button");
  cancelEL.innerText = "X";
  cancelEL.onclick = () => {
    tasks.splice(taskIdx, 1);
    renderTaskItems();
  };
  ctrbarEL.append(cancelEL);
/******************************* */
let importantEL = document.createElement("input");
importantEL.type = "checkbox";
if (task.im) {
  itemEl.classList.add("im");
} else {
  itemEl.classList.remove("im");
}

importantEL.checked = task.im;
importantEL.onchange = (e) => {
  task.im = e.target.checked;
  if (task.im) {
    itemEl.classList.add("im");
  } else {
    itemEl.classList.remove("im");
  }
}
itemEl.append(importantEL);

 /* let unimportantEL = document.createElement("button");
  unimportantEL.innerText = "\u272A";
  ctrbarEL.append(unimportantEL);
  
  let importantEL = document.createElement("button");
  importantEL.innerText = "\u2605";
  ctrbarEL.append(importantEL);
*/

  return ctrbarEL;
}

renderEditor();
renderTaskItems();
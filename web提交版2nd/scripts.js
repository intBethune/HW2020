
let tasks = [];




function renderEditor() {
  let inputEl = document.querySelector("#default--todo--panel .todo--editor > input");
 


  let addTask = () => {
    if (inputEl.value.length == 0) {
      return;
    }
    let newTask = {
      title: inputEl.value,
      done: false,
      im: false
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

    let importantEL = document.createElement("button");
  if (tasks[i].im) {
    importantEL.innerText = "⭐";
  } else {
    importantEL.innerText = "☆";
  }


  importantEL.onclick = () => {
    console.log("add click");
    
    if (tasks[i].im) {
      tasks[i].im = false;
      renderTaskItems();
    } else {
      tasks[i].im = true;
      renderTaskItems();
    };
    
    renderTaskItems();
  } 
  itemEl.append(importantEL);

    let titleEL = document.createElement("label");
    titleEL.innerText = task.title;
    itemEl.append(titleEL);

    let ctrbarEL = renderTaskCtrlBar(task, i, itemEl);

    itemEl.append(ctrbarEL);

    itemsEl.append(itemEl);
  }
}

function renderTaskCtrlBar(task, taskIdx, itemEl) {
  let ctrbarEL = document.createElement("div");
  ctrbarEL.className = "ctrlbar";

  




  let upEL = document.createElement("button");
  if (taskIdx === 0) {
    upEL.disabled = true;
  }
  upEL.innerText = "🠕";
  upEL.onclick = () => {
    var tmp = tasks[taskIdx];
    tasks[taskIdx] = tasks[taskIdx - 1]
    tasks[taskIdx - 1] = tmp;
    console.log();
    renderEditor();
    renderTaskItems();
  };
  ctrbarEL.append(upEL);

  
  let downEL = document.createElement("button");
  downEL.innerText = "🠗";
  if (taskIdx === tasks.length - 1) {
    downEL.disabled = true;
  }
  downEL.onclick = () => {
    var tmp = tasks[taskIdx];
    tasks[taskIdx] = tasks[taskIdx + 1]
    tasks[taskIdx + 1] = tmp;
    console.log();
    renderEditor();
    renderTaskItems();
  };

  ctrbarEL.append(downEL);


  
  let cancelEL = document.createElement("button");
  cancelEL.innerText = "X";
  cancelEL.onclick = () => {
    tasks.splice(taskIdx, 1);
    renderTaskItems();
  };
  ctrbarEL.append(cancelEL);


 

 

  return ctrbarEL;
}

renderEditor();
renderTaskItems();
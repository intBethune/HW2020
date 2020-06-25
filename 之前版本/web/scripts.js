
function renderEditor() {
    let inputEl = document.querySelector("#default--todo--panel .todo--editor >input");
    inputEl.onchange = (e) =>{
        console.log("input change:",e);
    }
}


renderEditor();
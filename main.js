let $newTask; //tresc zadania wpisana do inputa
let $btnAdd; //btn DODAJ
let $headInfo; // p w hederze, wyswietla info o taskach
let $ulList; // lista ul z zadaniami
let $taskNumber; //liczba tasków
let $idNumber = 0;
let $popupEdit; //popup z otwierdzeniem czy usunac zadanie
let $inputPopup;
let $btnCancelPopup; // btn cancel w popupie
let $btnAcceptPopup;
let $currentTask;
let $popupInfo;
// let $acceptDel; //btn akceptujacy usuniecie zadania popup
// let $cancelDel; //btn anulujacy usuniecie zadania popup




const prepareElements = () => {
    $newTask = document.querySelector("#task");
    $btnAdd = document.querySelector(".btn-add");
    $headInfo = document.querySelector(".head-info");
    $ulList = document.querySelector(".tasks-list");
    $taskNumber = document.getElementsByTagName('li');
    $popupEdit = document.querySelector(".popup-edit");
    $inputPopup = document.querySelector('.popup-task');
    $btnCancelPopup = document.querySelector('.cancel-popup')
    $btnAcceptPopup = document.querySelector('.accept-popup');
    $popupInfo = document.querySelector('.popup-info');
    // $acceptDel = document.querySelector('.accept-del');
    // $cancelDel = document.querySelector('.cancel-del');

}

const prepareEvents = () => {
    $btnAdd.addEventListener('click', checkTask);
    $ulList.addEventListener('click', checkBtn);
    $btnCancelPopup.addEventListener('click', cancelPopup);
    $btnAcceptPopup.addEventListener('click', acceptPopup);
    // $acceptDel.addEventListener('click', deleteTask);
    // $cancelDel.addEventListener('click', cancelTask);
}

const checkTask = () =>{
    if ($newTask.value === "") {
        $headInfo.innerText = "Wpisz treść zadania!"
        $headInfo.style.color = "red";
    }
    else {
        $idNumber++;
        $headInfo.style.color = "";
        createTaskElements();
        $newTask.value = "";
        $headInfo.innerText = `Zadania do wykonania:`
    }
}


const createTaskElements = () => {
    const taskBox = document.createElement('div');
    const newLi = document.createElement('li');
    const divTools = document.createElement('div');
    const btnAccept = document.createElement('button');
    const btnEdit = document.createElement('button');
    const btnDel = document.createElement('button');

    taskBox.classList.add('task-box');
    $ulList.appendChild(taskBox);
    newLi.classList.add('task');
    newLi.innerHTML = $newTask.value;
    taskBox.appendChild(newLi);

    divTools.classList.add('tools');
    taskBox.appendChild(divTools);

    btnAccept.classList.add('accept');
    btnAccept.innerHTML = '<i class="fas fa-check"></i>'
    divTools.appendChild(btnAccept);

    btnEdit.classList.add('edit');
    btnEdit.innerHTML = 'EDIT'
    divTools.appendChild(btnEdit);

    btnDel.classList.add('delete');
    btnDel.innerHTML = '<i class="fas fa-trash-alt"></i>'
    divTools.appendChild(btnDel);

    newLi.setAttribute('id', `TODO-${$idNumber}`);

}

const checkBtn = (e) => {
    // console.log(e.target.closest('button').classList.contains('delete'));
    if (e.target.closest('button').classList.contains('delete')) {
        deleteTask(e);
        if ($taskNumber.length > 0) {
            $headInfo.innerText = `Zadania do wykonania:`
        } else $headInfo.innerText = `Nie masz zadań do wykonania :)`
        
    }  else if ((e.target.closest('button').classList.contains('accept'))){
        doneTask(e);
    } else if ((e.target.closest('button').classList.contains('edit'))) {
        editTask(e);
    }
}

const deleteTask = (e) => {
    // console.log(e.target.closest('button').parentNode.parentNode);
  e.target.closest('button').parentNode.parentNode.remove();
}

const doneTask = (e)=> {
    e.target.closest('button').classList.toggle('accepted');
    e.target.closest('button').parentElement.parentElement.firstElementChild.classList.toggle('done-li'); 
}

const editTask = (e) => {
    $currentTask = e.target.closest('button').parentElement.parentElement.firstElementChild;
    // console.log($currentTask.id);
    $popupEdit.classList.add('show');
    $inputPopup.value = $currentTask.innerText;
}

const cancelPopup = ()=>{
    $popupEdit.classList.remove('show');
}

const acceptPopup = () => {
    // console.log($inputPopup.value);
    if ($inputPopup.value === "") {
        $popupInfo.innerText = "Musisz wpisać treść zadania"
    } else {
        $popupInfo.innerText = ""
        $currentTask.innerHTML = $inputPopup.value;
        // console.log($currentTask.id);
        $popupEdit.classList.remove('show');
      
    }
    
    
}
const main = () => {
    prepareElements();
    prepareEvents();
}

document.addEventListener('DOMContentLoaded', main);
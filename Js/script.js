const localStorageKey = 'to-do-list'

function newTask () {
    let input = document.getElementById('input-new-task') 

    // validation

    if(!input.value){
        alert('Type anything to add in your list')
    }
    else {
        // increment to localStorage
        let value = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    }
}
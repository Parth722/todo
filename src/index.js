import Item from './item'
import List from './lists'
import DOMcontrol from './DOM'


document.addEventListener('DOMContentLoaded', () => {
    const mainList = new List('main');
    const DOM_control = DOMcontrol();
    let modal = document.querySelector('.modal');
    
    //closing modal
    function close_modal(){
        modal.style.display = "none";
        document.querySelector('.add-new-list').style.display = "none";
        document.querySelector('.edit-list-name').style.display = "none";
        document.querySelector('.delete-list-modal').style.display = "none";
        document.querySelector('.add-item-modal').style.display = "none";
        document.querySelector('.lists').style.display = "none";
        document.querySelector('.lists div').style.display = "none";
        document.querySelector('.list-name').value = '';
    }

    document.querySelector('.done').addEventListener('click', () => {
        let name = document.querySelector('.list-name').value;
        DOM_control.add_to_main(mainList, name);
        close_modal();
    })

    document.querySelector("#project-menu .create").addEventListener('click', () => {
        modal.style.display = "block";
        document.querySelector('.add-new-list').style.display = "block";
    })
    

    document.querySelector('.modal .cancel').addEventListener('click', close_modal);
    window.onclick = (evt) => {
        if(evt.target == modal){
            close_modal();
        }
    }    
})

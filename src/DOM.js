import Item from './item'
import List from './lists'

const DOMcontrol = () => {
    function add_to_main(list, name){
        if (name == ""){
            alert('List name should not be empty string.')
            return;
        }
        let l = new List(name);
        if (list.add_to_list(l) < 0 && list.name == 'main'){
            alert('Add a different name.');
            return;
        };
        if(list.name == 'main'){
            create_card(list,name)
        } 
    }

    function create_card(list,name){
        let card = document.createElement('div');
        card.classList.add('project-item',`card-${list.index}`);
        card.innerHTML = `<p>${name}</p><hr>`;
        let nav = document.createElement('div');
        nav.classList.add('nav-menu');
        nav.innerHTML = "<i class='material-icons add-item' style='font-weight: lighter' title='Add Item'>playlist_add</i>\
                         <i class='material-icons edit-name' style='font-weight: lighter' title='Edit Name'>create</i>\
                         <i class='material-icons delete-list' style='font-weight: lighter' title='Delete'>delete</i>";
        card.appendChild(nav);
        let list_div  = document.createElement('div');
        list_div.classList.add(`todo-list-${list.index}`);
        let p = document.createElement('p');
        p.classList.add('ln');
        p.innerHTML = name;
        list_div.appendChild(p);
        let btn = document.createElement('input');
        btn.type = "button"; btn.value = "Close"; btn.className = "cancel";
        btn.addEventListener('click', (evt) => close_todolist(evt));
        let ul = document.createElement('ul');
        let li = document.createElement('li');
        li.className = "close-btn";
        li.appendChild(btn)
        ul.appendChild(li)
        list_div.appendChild(ul);
        document.querySelector('.lists').appendChild(list_div);
        let br = document.querySelector('.inner br');
        document.querySelector('#project-menu .inner').insertBefore(card, br);
        card.addEventListener('click', (evt) => open_todolist(evt));
        document.querySelector(`.card-${list.index} .edit-name`).addEventListener('click', (evt) => edit_name(evt, list));
        document.querySelector(`.card-${list.index} .add-item`).addEventListener('click', (evt) => add_item(evt, list));
        document.querySelector(`.card-${list.index} .delete-list`).addEventListener('click', (evt) => delete_list(evt, list));
    }

    function close_todolist(evt){
        let c = evt.target.parentNode.parentNode.parentNode;
        let index = /\d+/g; 
        index = c.classList[0].match(index);
        index = Number(index[0]);

        document.querySelector('.modal').style.display = "none";
        document.querySelector('.modal .lists').style.display = "none";
        document.querySelector(`.todo-list-${index}`).style.display = "none";
    }

    function open_todolist(evt){
        let c = evt.target;
        if (c.nodeName == 'I'){
            return;
        }
        if(c.nodeName == 'P'){
            c = c.parentNode;
        }
        let index = /\d+/g; 
        index = c.classList[1].match(index);
        index = Number(index[0]);

        document.querySelector('.modal').style.display = "block";
        document.querySelector('.modal .lists').style.display = "block";
        document.querySelector(`.todo-list-${index}`).style.display = "block";
    }

    function edit_name(evt, list){
        //getting parent div
        let list_item = evt.target.parentNode.parentNode;

        //regex for getting card number for getting index for list.
        let index = /\d+/g; 
        index = list_item.classList[1].match(index);
        index = Number(index[0])-1;

        //opening modal
        document.querySelector('.modal').style.display = "block";
        document.querySelector('.modal .edit-list-name').style.display = "block"
        document.querySelector('.edit-list-name .list-name').value = '';
        
        
        document.querySelector('.edit-list-name .done').onclick = () => {
            //getting value
            let n = document.querySelector('.edit-list-name .list-name').value;
            if(n==''){
                return;
            }
            else{
                for(let i = 0; i < list.index; i++){
                    if(i == index){
                        continue
                    }
                    if (list.list[i].name == n){
                        alert('A list with this name already exists!');
                        return;
                    }
                }
                list.list[index].change_name(n);
                document.querySelector(`.card-${index+1} p`).innerHTML = n;
                document.querySelector(`.todo-list-${index+1} .ln`).innerHTML = n;
                document.querySelector('.modal').style.display = "none";
                document.querySelector('.edit-list-name').style.display = "none";
                return;
            }
        }
        
        //closing modal
        document.querySelector('.edit-list-name .cancel').onclick = () => {
            document.querySelector('.modal').style.display = "none";
            document.querySelector('.edit-list-name').style.display = "none";
            return;
        } 
        
    }

    function add_item(evt, list){
        let list_item = evt.target.parentNode.parentNode;

        //regex for getting card number for getting index for list.
        let index = /\d+/g; 
        index = list_item.classList[1].match(index);
        index = Number(index[0])-1;
        //opening modal
        document.querySelector('.modal').style.display = "block";
        document.querySelector('.modal .add-item-modal').style.display = "block";
        document.querySelector('.add-item-modal .task-name').value = '';
        document.querySelector('.add-item-modal .task-descp').value = '';
        document.querySelector('.add-item-modal .date').value = '';
        document.querySelector('.add-item-modal .priority').value = 'High';

        document.querySelector('.add-item-modal .done').onclick = () => {
            //getting value
            let task = document.querySelector('.add-item-modal .task-name').value;
            let descp = document.querySelector('.add-item-modal .task-descp').value;
            let date = document.querySelector('.add-item-modal .date').value;
            let priority = document.querySelector('.add-item-modal .priority').value;

            if (task == '' || descp == ''){
                alert('Task or Descrpition can\'t be empty');
                return;
            }
            let item = new Item(task, descp, date, false, priority);
            create_list_item(item, list.list[index], index+1);
            list.list[index].add_to_list(item);
            document.querySelector('.modal .add-item-modal').style.display = "none";
            document.querySelector('.modal .lists').style.display = "block";
            document.querySelector(`.modal .lists .todo-list-${index+1}`).style.display = "block";
            
        }

        document.querySelector('.add-item-modal .cancel').onclick = () => {
            document.querySelector('.modal').style.display = "none";
            document.querySelector('.add-item-modal').style.display = "none";
            return;
        } 
    }

    function create_list_item(item, todo_list, index){
        let ul = document.querySelector(`.todo-list-${index} ul`);
        let li = document.createElement('li');
        li.className = `item-${todo_list.index+1}`
        let dict = {
            'Low': '#f56262',
            'Mid': '#f1d483',
            'High': '#41ec89'
        }

        //li.innerText = item.task;
        li.style.border = `5px solid ${dict[item.priority]}`;
        li.innerHTML = `${item.task}`;
        let del = document.createElement('i');
        del.innerHTML = 'delete';
        del.classList.add('material-icons', 'delete-list');
        let p = document.createElement('p');
        p.className = 'date';
        p.innerHTML = item.due_date;
        li.appendChild(del);
        li.appendChild(p);
        del.addEventListener('click', (evt) => {
            let item = evt.target.parentNode;
            let index = /\d+/g; 
            index = item.className.match(index);
            index = Number(index[0])-1;
            todo_list.remove_from_list(index);
            item.remove();
        })
        ul.insertBefore(li, document.querySelector(`.todo-list-${index} ul .close-btn`));
    }

    function delete_list(evt, list){
        let list_item = evt.target.parentNode.parentNode;
        let index = /\d+/g; 
        index = list_item.classList[1].match(index);
        index = Number(index[0])-1;
        
        //opening modal
        document.querySelector('.modal').style.display = "block";
        document.querySelector('.modal .delete-list-modal').style.display = "block"
        
        
        document.querySelector('.delete-list-modal .done').onclick = () => {
            list.remove_from_list(index);
            list_item.remove();
            document.querySelector(`.lists .todo-list-${index+1}`).remove();
            document.querySelector('.modal').style.display = "none";
            document.querySelector('.modal .delete-list-modal').style.display = "none";
            return;
        }
        
        //closing modal
        document.querySelector('.delete-list-modal .cancel').onclick = () => {
            document.querySelector('.modal').style.display = "none";
            document.querySelector('.modal .delete-list-modal').style.display = "none";
            return;
        } 
        
    }

    return {add_to_main}
}

export default DOMcontrol
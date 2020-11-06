/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item */ "./src/item.js");
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lists */ "./src/lists.js");



const DOMcontrol = () => {
    function add_to_main(list, name){
        if (name == ""){
            alert('List name should not be empty string.')
            return;
        }
        let l = new _lists__WEBPACK_IMPORTED_MODULE_1__.default(name);
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
            let item = new _item__WEBPACK_IMPORTED_MODULE_0__.default(task, descp, date, false, priority);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DOMcontrol);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item */ "./src/item.js");
/* harmony import */ var _lists__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lists */ "./src/lists.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");





document.addEventListener('DOMContentLoaded', () => {
    const mainList = new _lists__WEBPACK_IMPORTED_MODULE_1__.default('main');
    const DOM_control = (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.default)();
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


/***/ }),

/***/ "./src/item.js":
/*!*********************!*\
  !*** ./src/item.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class Item {
    constructor(task, description, due_date, is_complete, priority){
        this.task = task;
        this.description = description;
        this.due_date = due_date;
        this.is_complete = is_complete;
        this.priority = priority;
    }

    edit_task(task){
        this.edit_task  = task;
    }

    edit_description(description){
        this.description = description;
    }

    edit_due_date(due_date){
        this.due_date = due_date;
    }

    mark_complete(){
        this.is_complete = true;
    }

    mark_incomplete(){
        this.is_complete = false;
    }

    set_priortiy(priority){
        this.priority = priority;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Item);

/***/ }),

/***/ "./src/lists.js":
/*!**********************!*\
  !*** ./src/lists.js ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class List {
    constructor(name){
        this.name = name;
        this.list = [];
        this.index = 0; //index of last element
    }
    
    get_name(){
        return this.name;
    }

    change_name(name){
        this.name = name;
    }

    add_to_list(item){
        for(let i = 0; i < this.list.length; i++){
            if (this.list[i].name == item.name){
                return -1;
            }
        }
        this.list.push(item);
        this.index++;
        return 1;
    }

    remove_from_list(i){
        if(this.index <= 0){
            return;
        }
        //let i = this.list.findIndex(item);
        this.index--;
        this.list.splice(i, 1);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvaXRlbS5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2xpc3RzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QjtBQUNDOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkNBQUk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBOztBQUVBO0FBQ0E7QUFDQSxrREFBa0QsV0FBVztBQUM3RCwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxXQUFXO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRCx3Q0FBd0MsV0FBVztBQUNuRCx3Q0FBd0MsV0FBVztBQUNuRDs7QUFFQTtBQUNBO0FBQ0EsMkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2Q0FBNkMsTUFBTTtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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N0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSXRlbSBmcm9tICcuL2l0ZW0nXHJcbmltcG9ydCBMaXN0IGZyb20gJy4vbGlzdHMnXHJcblxyXG5jb25zdCBET01jb250cm9sID0gKCkgPT4ge1xyXG4gICAgZnVuY3Rpb24gYWRkX3RvX21haW4obGlzdCwgbmFtZSl7XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJcIil7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdMaXN0IG5hbWUgc2hvdWxkIG5vdCBiZSBlbXB0eSBzdHJpbmcuJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbCA9IG5ldyBMaXN0KG5hbWUpO1xyXG4gICAgICAgIGlmIChsaXN0LmFkZF90b19saXN0KGwpIDwgMCAmJiBsaXN0Lm5hbWUgPT0gJ21haW4nKXtcclxuICAgICAgICAgICAgYWxlcnQoJ0FkZCBhIGRpZmZlcmVudCBuYW1lLicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZihsaXN0Lm5hbWUgPT0gJ21haW4nKXtcclxuICAgICAgICAgICAgY3JlYXRlX2NhcmQobGlzdCxuYW1lKVxyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlX2NhcmQobGlzdCxuYW1lKXtcclxuICAgICAgICBsZXQgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pdGVtJyxgY2FyZC0ke2xpc3QuaW5kZXh9YCk7XHJcbiAgICAgICAgY2FyZC5pbm5lckhUTUwgPSBgPHA+JHtuYW1lfTwvcD48aHI+YDtcclxuICAgICAgICBsZXQgbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoJ25hdi1tZW51Jyk7XHJcbiAgICAgICAgbmF2LmlubmVySFRNTCA9IFwiPGkgY2xhc3M9J21hdGVyaWFsLWljb25zIGFkZC1pdGVtJyBzdHlsZT0nZm9udC13ZWlnaHQ6IGxpZ2h0ZXInIHRpdGxlPSdBZGQgSXRlbSc+cGxheWxpc3RfYWRkPC9pPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz0nbWF0ZXJpYWwtaWNvbnMgZWRpdC1uYW1lJyBzdHlsZT0nZm9udC13ZWlnaHQ6IGxpZ2h0ZXInIHRpdGxlPSdFZGl0IE5hbWUnPmNyZWF0ZTwvaT5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9J21hdGVyaWFsLWljb25zIGRlbGV0ZS1saXN0JyBzdHlsZT0nZm9udC13ZWlnaHQ6IGxpZ2h0ZXInIHRpdGxlPSdEZWxldGUnPmRlbGV0ZTwvaT5cIjtcclxuICAgICAgICBjYXJkLmFwcGVuZENoaWxkKG5hdik7XHJcbiAgICAgICAgbGV0IGxpc3RfZGl2ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxpc3RfZGl2LmNsYXNzTGlzdC5hZGQoYHRvZG8tbGlzdC0ke2xpc3QuaW5kZXh9YCk7XHJcbiAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdsbicpO1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gbmFtZTtcclxuICAgICAgICBsaXN0X2Rpdi5hcHBlbmRDaGlsZChwKTtcclxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICBidG4udHlwZSA9IFwiYnV0dG9uXCI7IGJ0bi52YWx1ZSA9IFwiQ2xvc2VcIjsgYnRuLmNsYXNzTmFtZSA9IFwiY2FuY2VsXCI7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4gY2xvc2VfdG9kb2xpc3QoZXZ0KSk7XHJcbiAgICAgICAgbGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcclxuICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gICAgICAgIGxpLmNsYXNzTmFtZSA9IFwiY2xvc2UtYnRuXCI7XHJcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoYnRuKVxyXG4gICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxyXG4gICAgICAgIGxpc3RfZGl2LmFwcGVuZENoaWxkKHVsKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdHMnKS5hcHBlbmRDaGlsZChsaXN0X2Rpdik7XHJcbiAgICAgICAgbGV0IGJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlubmVyIGJyJyk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbWVudSAuaW5uZXInKS5pbnNlcnRCZWZvcmUoY2FyZCwgYnIpO1xyXG4gICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiBvcGVuX3RvZG9saXN0KGV2dCkpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jYXJkLSR7bGlzdC5pbmRleH0gLmVkaXQtbmFtZWApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4gZWRpdF9uYW1lKGV2dCwgbGlzdCkpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jYXJkLSR7bGlzdC5pbmRleH0gLmFkZC1pdGVtYCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiBhZGRfaXRlbShldnQsIGxpc3QpKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2FyZC0ke2xpc3QuaW5kZXh9IC5kZWxldGUtbGlzdGApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4gZGVsZXRlX2xpc3QoZXZ0LCBsaXN0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VfdG9kb2xpc3QoZXZ0KXtcclxuICAgICAgICBsZXQgYyA9IGV2dC50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gL1xcZCsvZzsgXHJcbiAgICAgICAgaW5kZXggPSBjLmNsYXNzTGlzdFswXS5tYXRjaChpbmRleCk7XHJcbiAgICAgICAgaW5kZXggPSBOdW1iZXIoaW5kZXhbMF0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsIC5saXN0cycpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudG9kby1saXN0LSR7aW5kZXh9YCkuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5fdG9kb2xpc3QoZXZ0KXtcclxuICAgICAgICBsZXQgYyA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgaWYgKGMubm9kZU5hbWUgPT0gJ0knKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjLm5vZGVOYW1lID09ICdQJyl7XHJcbiAgICAgICAgICAgIGMgPSBjLnBhcmVudE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IC9cXGQrL2c7IFxyXG4gICAgICAgIGluZGV4ID0gYy5jbGFzc0xpc3RbMV0ubWF0Y2goaW5kZXgpO1xyXG4gICAgICAgIGluZGV4ID0gTnVtYmVyKGluZGV4WzBdKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwgLmxpc3RzJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudG9kby1saXN0LSR7aW5kZXh9YCkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0X25hbWUoZXZ0LCBsaXN0KXtcclxuICAgICAgICAvL2dldHRpbmcgcGFyZW50IGRpdlxyXG4gICAgICAgIGxldCBsaXN0X2l0ZW0gPSBldnQudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgLy9yZWdleCBmb3IgZ2V0dGluZyBjYXJkIG51bWJlciBmb3IgZ2V0dGluZyBpbmRleCBmb3IgbGlzdC5cclxuICAgICAgICBsZXQgaW5kZXggPSAvXFxkKy9nOyBcclxuICAgICAgICBpbmRleCA9IGxpc3RfaXRlbS5jbGFzc0xpc3RbMV0ubWF0Y2goaW5kZXgpO1xyXG4gICAgICAgIGluZGV4ID0gTnVtYmVyKGluZGV4WzBdKS0xO1xyXG5cclxuICAgICAgICAvL29wZW5pbmcgbW9kYWxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCAuZWRpdC1saXN0LW5hbWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtbGlzdC1uYW1lIC5saXN0LW5hbWUnKS52YWx1ZSA9ICcnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LWxpc3QtbmFtZSAuZG9uZScpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vZ2V0dGluZyB2YWx1ZVxyXG4gICAgICAgICAgICBsZXQgbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LWxpc3QtbmFtZSAubGlzdC1uYW1lJykudmFsdWU7XHJcbiAgICAgICAgICAgIGlmKG49PScnKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QuaW5kZXg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0Lmxpc3RbaV0ubmFtZSA9PSBuKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0EgbGlzdCB3aXRoIHRoaXMgbmFtZSBhbHJlYWR5IGV4aXN0cyEnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpc3QubGlzdFtpbmRleF0uY2hhbmdlX25hbWUobik7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2FyZC0ke2luZGV4KzF9IHBgKS5pbm5lckhUTUwgPSBuO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRvZG8tbGlzdC0ke2luZGV4KzF9IC5sbmApLmlubmVySFRNTCA9IG47XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC1saXN0LW5hbWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jbG9zaW5nIG1vZGFsXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtbGlzdC1uYW1lIC5jYW5jZWwnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LWxpc3QtbmFtZScpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkX2l0ZW0oZXZ0LCBsaXN0KXtcclxuICAgICAgICBsZXQgbGlzdF9pdGVtID0gZXZ0LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgIC8vcmVnZXggZm9yIGdldHRpbmcgY2FyZCBudW1iZXIgZm9yIGdldHRpbmcgaW5kZXggZm9yIGxpc3QuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gL1xcZCsvZzsgXHJcbiAgICAgICAgaW5kZXggPSBsaXN0X2l0ZW0uY2xhc3NMaXN0WzFdLm1hdGNoKGluZGV4KTtcclxuICAgICAgICBpbmRleCA9IE51bWJlcihpbmRleFswXSktMTtcclxuICAgICAgICAvL29wZW5pbmcgbW9kYWxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCAuYWRkLWl0ZW0tbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtaXRlbS1tb2RhbCAudGFzay1uYW1lJykudmFsdWUgPSAnJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWl0ZW0tbW9kYWwgLnRhc2stZGVzY3AnKS52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtaXRlbS1tb2RhbCAuZGF0ZScpLnZhbHVlID0gJyc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1pdGVtLW1vZGFsIC5wcmlvcml0eScpLnZhbHVlID0gJ0hpZ2gnO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWl0ZW0tbW9kYWwgLmRvbmUnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAvL2dldHRpbmcgdmFsdWVcclxuICAgICAgICAgICAgbGV0IHRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWl0ZW0tbW9kYWwgLnRhc2stbmFtZScpLnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZGVzY3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWl0ZW0tbW9kYWwgLnRhc2stZGVzY3AnKS52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWl0ZW0tbW9kYWwgLmRhdGUnKS52YWx1ZTtcclxuICAgICAgICAgICAgbGV0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1pdGVtLW1vZGFsIC5wcmlvcml0eScpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRhc2sgPT0gJycgfHwgZGVzY3AgPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ1Rhc2sgb3IgRGVzY3JwaXRpb24gY2FuXFwndCBiZSBlbXB0eScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IEl0ZW0odGFzaywgZGVzY3AsIGRhdGUsIGZhbHNlLCBwcmlvcml0eSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZV9saXN0X2l0ZW0oaXRlbSwgbGlzdC5saXN0W2luZGV4XSwgaW5kZXgrMSk7XHJcbiAgICAgICAgICAgIGxpc3QubGlzdFtpbmRleF0uYWRkX3RvX2xpc3QoaXRlbSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCAuYWRkLWl0ZW0tbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCAubGlzdHMnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAubW9kYWwgLmxpc3RzIC50b2RvLWxpc3QtJHtpbmRleCsxfWApLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1pdGVtLW1vZGFsIC5jYW5jZWwnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtaXRlbS1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlX2xpc3RfaXRlbShpdGVtLCB0b2RvX2xpc3QsIGluZGV4KXtcclxuICAgICAgICBsZXQgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudG9kby1saXN0LSR7aW5kZXh9IHVsYCk7XHJcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICBsaS5jbGFzc05hbWUgPSBgaXRlbS0ke3RvZG9fbGlzdC5pbmRleCsxfWBcclxuICAgICAgICBsZXQgZGljdCA9IHtcclxuICAgICAgICAgICAgJ0xvdyc6ICcjZjU2MjYyJyxcclxuICAgICAgICAgICAgJ01pZCc6ICcjZjFkNDgzJyxcclxuICAgICAgICAgICAgJ0hpZ2gnOiAnIzQxZWM4OSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbGkuaW5uZXJUZXh0ID0gaXRlbS50YXNrO1xyXG4gICAgICAgIGxpLnN0eWxlLmJvcmRlciA9IGA1cHggc29saWQgJHtkaWN0W2l0ZW0ucHJpb3JpdHldfWA7XHJcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gYCR7aXRlbS50YXNrfWA7XHJcbiAgICAgICAgbGV0IGRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgICAgICBkZWwuaW5uZXJIVE1MID0gJ2RlbGV0ZSc7XHJcbiAgICAgICAgZGVsLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJywgJ2RlbGV0ZS1saXN0Jyk7XHJcbiAgICAgICAgbGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgcC5jbGFzc05hbWUgPSAnZGF0ZSc7XHJcbiAgICAgICAgcC5pbm5lckhUTUwgPSBpdGVtLmR1ZV9kYXRlO1xyXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGRlbCk7XHJcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQocCk7XHJcbiAgICAgICAgZGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGV2dC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gL1xcZCsvZzsgXHJcbiAgICAgICAgICAgIGluZGV4ID0gaXRlbS5jbGFzc05hbWUubWF0Y2goaW5kZXgpO1xyXG4gICAgICAgICAgICBpbmRleCA9IE51bWJlcihpbmRleFswXSktMTtcclxuICAgICAgICAgICAgdG9kb19saXN0LnJlbW92ZV9mcm9tX2xpc3QoaW5kZXgpO1xyXG4gICAgICAgICAgICBpdGVtLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdWwuaW5zZXJ0QmVmb3JlKGxpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudG9kby1saXN0LSR7aW5kZXh9IHVsIC5jbG9zZS1idG5gKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlX2xpc3QoZXZ0LCBsaXN0KXtcclxuICAgICAgICBsZXQgbGlzdF9pdGVtID0gZXZ0LnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gL1xcZCsvZzsgXHJcbiAgICAgICAgaW5kZXggPSBsaXN0X2l0ZW0uY2xhc3NMaXN0WzFdLm1hdGNoKGluZGV4KTtcclxuICAgICAgICBpbmRleCA9IE51bWJlcihpbmRleFswXSktMTtcclxuICAgICAgICBcclxuICAgICAgICAvL29wZW5pbmcgbW9kYWxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCAuZGVsZXRlLWxpc3QtbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1saXN0LW1vZGFsIC5kb25lJykub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGlzdC5yZW1vdmVfZnJvbV9saXN0KGluZGV4KTtcclxuICAgICAgICAgICAgbGlzdF9pdGVtLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAubGlzdHMgLnRvZG8tbGlzdC0ke2luZGV4KzF9YCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsIC5kZWxldGUtbGlzdC1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL2Nsb3NpbmcgbW9kYWxcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWxpc3QtbW9kYWwgLmNhbmNlbCcpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsIC5kZWxldGUtbGlzdC1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHthZGRfdG9fbWFpbn1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRE9NY29udHJvbCIsImltcG9ydCBJdGVtIGZyb20gJy4vaXRlbSdcclxuaW1wb3J0IExpc3QgZnJvbSAnLi9saXN0cydcclxuaW1wb3J0IERPTWNvbnRyb2wgZnJvbSAnLi9ET00nXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IG1haW5MaXN0ID0gbmV3IExpc3QoJ21haW4nKTtcclxuICAgIGNvbnN0IERPTV9jb250cm9sID0gRE9NY29udHJvbCgpO1xyXG4gICAgbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XHJcbiAgICBcclxuICAgIC8vY2xvc2luZyBtb2RhbFxyXG4gICAgZnVuY3Rpb24gY2xvc2VfbW9kYWwoKXtcclxuICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1uZXctbGlzdCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC1saXN0LW5hbWUnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1saXN0LW1vZGFsJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtaXRlbS1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdHMnKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RzIGRpdicpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1uYW1lJykudmFsdWUgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZG9uZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtbmFtZScpLnZhbHVlO1xyXG4gICAgICAgIERPTV9jb250cm9sLmFkZF90b19tYWluKG1haW5MaXN0LCBuYW1lKTtcclxuICAgICAgICBjbG9zZV9tb2RhbCgpO1xyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbWVudSAuY3JlYXRlXCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1uZXctbGlzdCcpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcbiAgICB9KVxyXG4gICAgXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsIC5jYW5jZWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlX21vZGFsKTtcclxuICAgIHdpbmRvdy5vbmNsaWNrID0gKGV2dCkgPT4ge1xyXG4gICAgICAgIGlmKGV2dC50YXJnZXQgPT0gbW9kYWwpe1xyXG4gICAgICAgICAgICBjbG9zZV9tb2RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0gICAgXHJcbn0pXHJcbiIsImNsYXNzIEl0ZW0ge1xyXG4gICAgY29uc3RydWN0b3IodGFzaywgZGVzY3JpcHRpb24sIGR1ZV9kYXRlLCBpc19jb21wbGV0ZSwgcHJpb3JpdHkpe1xyXG4gICAgICAgIHRoaXMudGFzayA9IHRhc2s7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIHRoaXMuZHVlX2RhdGUgPSBkdWVfZGF0ZTtcclxuICAgICAgICB0aGlzLmlzX2NvbXBsZXRlID0gaXNfY29tcGxldGU7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRfdGFzayh0YXNrKXtcclxuICAgICAgICB0aGlzLmVkaXRfdGFzayAgPSB0YXNrO1xyXG4gICAgfVxyXG5cclxuICAgIGVkaXRfZGVzY3JpcHRpb24oZGVzY3JpcHRpb24pe1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0X2R1ZV9kYXRlKGR1ZV9kYXRlKXtcclxuICAgICAgICB0aGlzLmR1ZV9kYXRlID0gZHVlX2RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgbWFya19jb21wbGV0ZSgpe1xyXG4gICAgICAgIHRoaXMuaXNfY29tcGxldGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1hcmtfaW5jb21wbGV0ZSgpe1xyXG4gICAgICAgIHRoaXMuaXNfY29tcGxldGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRfcHJpb3J0aXkocHJpb3JpdHkpe1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSXRlbSIsImNsYXNzIExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmluZGV4ID0gMDsgLy9pbmRleCBvZiBsYXN0IGVsZW1lbnRcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0X25hbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZV9uYW1lKG5hbWUpe1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkX3RvX2xpc3QoaXRlbSl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RbaV0ubmFtZSA9PSBpdGVtLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMuaW5kZXgrKztcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVfZnJvbV9saXN0KGkpe1xyXG4gICAgICAgIGlmKHRoaXMuaW5kZXggPD0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9sZXQgaSA9IHRoaXMubGlzdC5maW5kSW5kZXgoaXRlbSk7XHJcbiAgICAgICAgdGhpcy5pbmRleC0tO1xyXG4gICAgICAgIHRoaXMubGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMaXN0IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9
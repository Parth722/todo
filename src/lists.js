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

export default List
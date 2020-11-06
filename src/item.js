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

export default Item
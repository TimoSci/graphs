class DoublyLinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

class DoublyLinkedList {
    constructor(){
        this.head = new DoublyLinkedListNode(null);
        this.tail = new DoublyLinkedListNode(null);
        this.head.next = this.tail;
        this.tail.previous = this.head;
    }

    push(data){
        let node =  new DoublyLinkedListNode(data);
        let previous = this.tail.previous;
        node.previous = previous;
        previous.next = node;
        node.next = this.tail;
        this.tail.previous = node;
    }

    shift(){
        let node = this.head.next;
        let next = node.next;
        if(next === null){
          return null;
        }
        this.head.next = next;
        next.previous = this.head;
        return node.data;
    }

}

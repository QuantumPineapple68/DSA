package LinkedList;

public class LL {
    private Node head;
    private Node tail;
    private int size;

    public LL() {
        this.size = 0;
    }

    void insertAtFirst(int value){
        if (head == null) {
            Node node = new Node(value);
            head = node;
            tail = node;
            size++;
        }

        Node node = new Node(value);
        node.next = head;
        head = node;

        size++;
    }

    void display(){
        Node temp = head;
        for (int i = 0; i < size - 1; i++) {
            System.out.print(temp.value + " -> ");
            temp = temp.next;
        }
        System.out.print("Null");
        System.out.println();
    }

    void insertRec(int value, int index){
        try {
            if (index < size) {
                Node temp = head;
                int recCount = 0;
                helperInsertRec(value, index, temp, recCount);
            }
            else {
                throw new IndexOutOfBoundsException(index + " is out of bounds as size of the Linked list is " + size);
            }
        }
        catch(IndexOutOfBoundsException e){
            System.out.println("Exception: " + e.getMessage());
        }
    }
    private void helperInsertRec(int value, int index, Node temp, int recCount) {
        if (recCount == index-1){
            Node node = new Node(value);
            node.next = temp.next;
            temp.next = node;
            size++;
            return;
        }
        helperInsertRec(value,index,temp.next,recCount+1);
    }
}

class Node {
    int value;
    Node next;

    public Node(int value) {
        this.value = value;
    }

    public Node(Node next, int value) {
        this.next = next;
        this.value = value;
    }
}

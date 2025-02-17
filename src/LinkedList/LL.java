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

    public void insertLast(int val) {
        if (tail == null) {
            insertAtFirst(val);
            return;
        }
        Node node = new Node(val);
        tail.next = node;
        tail = node;
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

    public Node deleteDuplicates(Node node) {
        if (node == null){
            return node;
        }
        Node head = node;
        while(node.next != null){
            if (node.value == node.next.value){
                node = node.next;
            }
            else {
                node.next = node.next.next;
            }
        }
        return head;
    }


    public LL mergeTwoLists(LL list1, LL list2) {
        Node h1 = list1.head;
        Node h2 = list2.head;

        LL listAns = new LL();

        while (h1 != null && h2 != null){
            if (h1.value < h2.value){
                listAns.insertLast(h1.value);
                h1 = h1.next;
            }
            else {
                listAns.insertLast(h2.value);
                h2 = h2.next;
            }
        }

        while (h1 != null){
            listAns.insertLast(h1.value);
            h1=h1.next;
        }
        while (h1 != null){
            listAns.insertLast(h2.value);
            h2=h2.next;
        }
        return listAns;
    }

}

class Node {
    int value;
    Node next;

    public Node() {}

    public Node(int value) {
        this.value = value;
    }

    public Node(Node next, int value) {
        this.next = next;
        this.value = value;
    }
}

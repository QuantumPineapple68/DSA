package LinkedList;

public class main {
    public static void main(String[] args) {
        LL intlist = new LL();
        intlist.insertAtFirst(12);
        intlist.insertAtFirst(13);
        intlist.insertAtFirst(14);
        intlist.insertAtFirst(15);
        intlist.insertRec(69,5);
        intlist.display();
    }
}

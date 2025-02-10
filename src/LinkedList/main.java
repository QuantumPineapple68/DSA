package LinkedList;

public class main {
    public static void main(String[] args) {
        LL intlist = new LL();
        intlist.insertAtFirst(12);
        intlist.insertAtFirst(14);
        intlist.insertAtFirst(16);
        intlist.insertAtFirst(20);
        intlist.display();

        LL secList = new LL();
        intlist.insertAtFirst(12);
        intlist.insertAtFirst(13);
        intlist.insertAtFirst(15);
        intlist.insertAtFirst(18);
        intlist.display();
    }
}

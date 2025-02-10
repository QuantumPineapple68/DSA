package LinkedList;

public class Queations {
    public static void main(String[] args) {

    }

    public int lengthCycle(Node head) {
        Node fast = head;
        Node slow = head;

        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) {
                // calculate the length
                Node temp = slow;
                int length = 0;
                do {
                    temp = temp.next;
                    length++;
                } while (temp != slow);
                return length;
            }
        }
        return 0;
    }

    public Node detectCycle(Node head) {
        int lenght = 0;

        Node fast = head;
        Node slow = head;

        while (fast != null && fast.next != null){
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow){
                lenght = lengthCycle(slow);
                break;
            }
        }

        if (lenght ==0){
            return null;
        }

        Node f = head;
        Node s = head;

        while (lenght != 0){
            s = s.next;
            lenght--;
        }

        while (f != s){
            s=s.next;
            f=f.next;
        }
        return s;
    }
}

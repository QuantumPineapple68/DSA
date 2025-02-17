package LinkedList;

public class Queations {
    public static void main(String[] args) {
        System.out.println(isHappy(19));
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

    public static boolean isHappy(int n) {
        int fast = n;
        int slow = n;

        do{
            slow = valueForIsHappy(slow);
            fast = valueForIsHappy(valueForIsHappy(fast));
        }while(fast != slow);
        if (slow == 1){
            return true;
        }
        return false;
    }

    private static int valueForIsHappy(int value) {
        int ans = 0;
        while (value > 0){
            int rem = value%10;
            ans += rem * rem;
            value /= 10;
        }
        return ans;
    }

    class Solution {
        public Node sortList(Node head) {
            if (head == null || head.next == null) {
                return head;
            }

            Node mid = middleNode(head);
            Node leftHalf = head;
            Node rightHalf = mid.next;
            mid.next = null;

            Node left = sortList(leftHalf);
            Node right = sortList(rightHalf);

            return mergeTwoLists(left, right);
        }

        private Node middleNode(Node head) {
            Node slow = head;
            Node fast = head;
            Node prev = null;

            while (fast != null && fast.next != null) {
                prev = slow;
                slow = slow.next;
                fast = fast.next.next;
            }

            return prev;
        }

        private Node mergeTwoLists(Node list1, Node list2) {
            Node dummy = new Node();
            Node tail = dummy;

            while (list1 != null && list2 != null) {
                if (list1.value < list2.value) {
                    tail.next = list1;
                    list1 = list1.next;
                } else {
                    tail.next = list2;
                    list2 = list2.next;
                }
                tail = tail.next;
            }

            if (list1 != null) {
                tail.next = list1;
            } else {
                tail.next = list2;
            }

            return dummy.next;
        }
    }

}

package LinkedList;

import java.util.Arrays;

public class Queations {
    public static void main(String[] args) {
        int[] arr = {1,45,3,2,4,65,7};
        selectiont(arr);
        System.out.println(Arrays.toString(arr));
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

    public Node cycleStart(Node head){
        Node slow = head;
        Node fast = head;

        while(fast!= null && fast.next!= null){
            fast = fast.next.next;
            slow = slow.next;

            if (slow == fast){
                //Cycle present, now formulae
                slow = head;
                while (slow != fast){
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
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

        public Node reverseList(Node head) {
            if (head == null){
                return head;
            }

            Node prev = null;
            Node curr = head;
            Node next = curr.next;

            while (curr != null){
                curr.next = prev;
                prev = curr;
                curr = next;
                if (next != null) {
                    next = next.next;
                }
            }
            return prev;
        }

        public Node reverseBetween(Node head, int left, int right) {
            if (left == right){
                return head;
            }

            Node curr = head;
            Node prev = null;
            for (int i = 0; curr != null && i < left-1; i++) {
                prev = curr;
                curr = curr.next;
            }

            Node last = prev;
            Node newEnd = curr;

            Node next = curr.next;
            for (int i = 0; curr != null && i < right - left + 1; i++) {
                curr.next = prev;
                prev = curr;
                curr = next;
                if (next != null) {
                    next = next.next;
                }
            }

            if (last != null){
                last.next = prev;
            }
            else {
                head = prev;
            }

            newEnd.next = curr;
            return head;
        }

        public boolean isPalindrome(Node head) {
            Node mid = middleNode(head);
            Node headSecond = reverseList(mid);
            Node rereverseHead = headSecond;

            while (head != null && headSecond != null){
                if (head.value != headSecond.value){
                    break;
                }
                head = head.next;
                headSecond = headSecond.next;
            }
            reverseList(rereverseHead);

            return head == null || headSecond == null;
        }

        public void reorderList(Node head) {
            if (head == null || head.next == null){
                return;
            }
            Node mid = middleNode(head);
            Node hf = head;
            Node hs = reverseList(mid);

            while (hf != null && hs != null){
                Node temp = hf.next;
                hf.next = hs;
                hf = temp;

                temp = hs.next;
                hs.next = hf;
                hs = temp;
            }

            if (hf != null){
                hf.next = null;
            }
        }

        public Node reverseKGroup(Node head, int k) {
            if (k <= 1 || head == null){
                return head;
            }

            Node curr = head;
            Node prev = null;

            while (true) {
                Node check = curr;
                int count = 0;
                while (check != null && count < k) {
                    check = check.next;
                    count++;
                }
                if (count < k) { // Not enough nodes left, so exit without reversing.
                    break;
                }
                Node last = prev;
                Node newEnd = curr;
                Node next = curr.next;
                for (int i = 0; curr != null && i < k; i++) {
                    curr.next = prev;
                    prev = curr;
                    curr = next;
                    if (next != null) {
                        next = next.next;
                    }
                    else {
                        break;
                    }
                }

                if (last != null) {
                    last.next = prev;
                } else {
                    head = prev;
                }

                newEnd.next = curr;

                if (curr == null){
                    break;
                }
                prev = newEnd;
            }
            return head;
        }

        public Node rotateRight(Node head, int k) {
            if (head == null || k == 0) {
                return head;
            }

            int length = 1;
            Node curr = head;
            while (curr.next != null) {
                curr = curr.next;
                length++;
            }

            k = k % length; // Formulae (See example 2)
            if (k == 0) return head;

            for (int i = 0; i < k; i++) {
                Node prev = head;
                curr = head.next;
                while (curr.next != null) {
                    prev = curr;
                    curr = curr.next;
                }
                curr.next = head;
                prev.next = null;
                head = curr;
            }

            return head;
        }

    }



        public static void selection (int[] arr){
            for(int i=1; i<arr.length-i-1; i++){
                int min = getMin(arr);
                if(min < arr[i]){
                    int temp = arr[i];
                    arr[i]=arr[min];
                    arr[min]=temp;
                }
            }
        }

        public static int getMin (int[] arr){
            int min = arr[0];
            for(int i=0; i<arr.length-1; i++){
                if(arr[i]>arr[i+1]){
                    min = i;
                }
            }
            return min;
        }

    public static void selectiont (int[] arr){
        int first = 0;
        int last = arr.length;

        for (int i = first; i < last -1-i; i++) {
            int min = getMin(arr);
            if(min > arr[i]){
                int temp = arr[i];
                arr[i]=arr[min];
                arr[min]=temp;
            }
        }
    }

}

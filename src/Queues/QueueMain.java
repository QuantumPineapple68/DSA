package Queues;

import Stacks.CustomStack;

public class QueueMain {
    public static void main(String[] args) throws Exception {
        CircularQueue q = new CircularQueue();

        q.insert(3);
        q.insert(4);
        q.insert(5);
        q.insert(6);
        q.insert(7);

        q.display();
//        System.out.println(q.remove());
//        q.display();
        q.insert(10);
        q.display();


    }
}

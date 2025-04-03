package Queues;

public class CircularQueue {
    protected int[] data;
    private int size;
    private int front = 0;
    private int end = 0;

    public CircularQueue() {
        this(5);
    }

    public CircularQueue(int capacity) {
        this.data = new int[capacity];
        this.size = 0;
    }

    public void insert(int num) {
        if (isFull()) {
            front = (front + 1) % data.length;
            size--;
        }
        data[end] = num;
        end = (end + 1) % data.length;
        size++;
    }

    public int remove() throws Exception {
        if (isEmpty()) {
            throw new Exception("Queue is Empty");
        }
        int removed = data[front];
        front = (front + 1) % data.length;
        size--;
        return removed;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == data.length;
    }

    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is Empty");
            return;
        }
        int i = front;
        int count = 0;
        while (count < size) {
            System.out.print(data[i] + " -> ");
            i = (i + 1) % data.length;
            count++;
        }
        System.out.println("END");
    }
}

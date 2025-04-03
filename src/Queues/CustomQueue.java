package Queues;

public class CustomQueue {
    protected int[] data;
    int end = 0;
    static int size = 5;

    public CustomQueue(){
        this(size);
    }

    public CustomQueue(int size) {
        this.data = new int[size];
    }

    private boolean isFull(){
        return end == data.length;
    }

    private boolean isEmpty() {
        return end == 0;
    }

    public void insert(int num) throws ArrayIndexOutOfBoundsException{
        if (isFull()){
            throw new ArrayIndexOutOfBoundsException("Queue is already full");
        }
        data[end++] = num;
    }

    public int remove() throws Exception{
        if (isEmpty()){
            throw new Exception("Queue is Empty");
        }
        int removed = data[0];
        for (int i = 1; i < data.length; i++) {
            data[i-1] = data[i];
        }
        end--;
        return removed;
    }

    public void display() throws Exception {
        for (int i = 0; i < end; i++) {
            System.out.print(data[i] + " -> ");
        }
        System.out.println("END");
    }

}

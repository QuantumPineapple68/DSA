package Stacks;

public class CustomStack {
    protected int[] arr;
    static int size = 5;
    int ptr = 0;

    public CustomStack(){
        this(size);
    }

    public CustomStack(int size) {
        this.arr = new int[size];
    }

    public boolean isFull(){
        return ptr == arr.length;
    }

    public void push(int num){
        if (!isFull()){
            arr[ptr] = num;
            ptr++;
        }
    }

    public int top(){
        return arr[ptr-1];
    }

    public int pop() throws Exception{
        if (isEmpty()){
            throw new Exception ("Can't pop from empty stack");
        }
        int removed = arr[ptr-1];
        ptr--;
        size--;
        return removed;
    }

    private boolean isEmpty() {
        return ptr == 0;
    }

    public void display() throws Exception {
        for (int i = 0; i < ptr; i++) {
            System.out.print(arr[i] + " -> ");
        }
        System.out.println("END");
    }
}

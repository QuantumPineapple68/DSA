package Heaps;

public class main {
    public static void main(String[] args) throws Exception {
        Heap<Integer> heap = new Heap<>();

        heap.insert(12);
        heap.insert(23);
        heap.insert(1);
        heap.insert(43);
        heap.insert(3);

        System.out.println(heap.remove());
        System.out.println(heap.remove());
        System.out.println(heap.remove());

    }
}

package Heaps;

import java.util.ArrayList;

public class Heap <T extends Comparable<T>> {
    private ArrayList<T> list;

    public Heap(){
        list = new ArrayList<>();
    }

    private void swap (int first, int second){
        T temp = list.get(first);
        list.set(first, list.get(second));
        list.set(second, temp);
    }

    private int parent(int index){
        return (index-1)/2;
    }
    private int left(int index){
        return (2*index)+1;
    }
    private int right(int index){
        return (2*index)+2;
    }

    public void insert(T value){
        list.add(value);
        UpHeap(list.size()-1);
    }

    private void UpHeap(int i) {
        if(i==0){
            return;
        }
        int p = parent(i);
        if (list.get(i).compareTo(list.get(p)) < 0){
            swap(i,p);
            UpHeap(p);
        }
    }

    public T remove() throws Exception{
        if (list.isEmpty()){
            throw new Exception("Not cool ... can't remove from empty heap");
        }
        T temp = list.getFirst();

        T last = list.removeLast();
        list.set(0, last);
        DownHeap(0);

        return temp;
    }

    private void DownHeap(int i) {
        int min = i;
        int left = left(i);
        int right = right(i);

        if (left < list.size() && list.get(min).compareTo(list.get(left)) > 0){
            min = left;
        }
        if (right < list.size() && list.get(min).compareTo(list.get(right)) > 0){
            min = right;
        }

        if (min != i){
            swap(min, i);
            DownHeap(min);
        }
    }

    public ArrayList<T> HeapSort() throws Exception {
        ArrayList<T> data = new ArrayList<>();

        while (!list.isEmpty()){
            data.add(this.remove());
        }
        return data;
    }
}

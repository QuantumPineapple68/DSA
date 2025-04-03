package Stacks;

public class DynamicStack extends CustomStack{
    public DynamicStack(){
        super();
    }

    @Override
    public void push(int num) {
        if (isFull()){
            int[] temp = new int[arr.length * 2];
            for (int i = 0; i < arr.length; i++) {
                temp[i] = arr[i];
            }
            arr = temp;
        }
        super.push(num);
    }
}

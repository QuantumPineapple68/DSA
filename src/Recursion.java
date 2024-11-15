import java.util.ArrayList;
import java.util.List;

public class Recursion {
    public static void main(String[] args) {
        int[] arr = {18,2,4,12,45,18,55,19};
        System.out.println(linearSearchList(arr,18));
    }


    static int fbs(int n){

        if (n<2){
            return n;
        }
        return fbs(n-1) + fbs (n-2);
    }



    static void printit (int num , int fact){
        if (num==0){
            System.out.println(fact);
            return;
        }
        fact = fact*num;
        printit(num-1,fact);
    }



    static int steps (int num){
        return helperForSteps(num,0);
    }
    static int helperForSteps(int n, int steps){
        if (n==0){
            return steps;
        }
        if (n%2==0){
            return helperForSteps(n/2,steps+1);
        }
        else {
            return helperForSteps(n-1,steps+1);
        }
    }



    static boolean palin(int n){
        int digits = (int)Math.log10(n)+1;
        int rev = helperForPalin (n,digits);
        if (n==rev){
            return true;
        }
        return false;
    }

    private static int helperForPalin(int n, int digits) {
        if (n%10==n){
            return n;
        }
        int rem = n%10;
        return rem*(int)(Math.pow(10,digits-1))+helperForPalin(n/10,digits-1);
    }



    static boolean isSorted (int[] arr){
        int start = 0;
        return helperForSorted(arr, start);
    }

    private static boolean helperForSorted(int[] arr, int start) {
        if (start==arr.length-1){
            return true;
        }
        if (arr[start]<arr[start+1]){
            return helperForSorted(arr,start+1);
        }
        return false;
    }



    static int linearSearch (int[] arr, int target){
        int index = 0;
        return helperForLinearSearch(arr,target,index);
    }

    private static int helperForLinearSearch(int[] arr, int target, int index) {
        if (index == arr.length){
            return -1;
        }
        if (arr[index]==target){
            return index;
        }
        else {
            return  helperForLinearSearch(arr, target, index + 1);
        }
    }


    static ArrayList<Integer> linearSearchList(int[] arr, int target){
        int index =0;
        ArrayList<Integer> list = new ArrayList<>();
        return helperForLinearSearchList(arr, target, index, list);
    }

    private static ArrayList<Integer> helperForLinearSearchList(int[] arr, int target, int index, ArrayList<Integer> list) {
        if (index == arr.length){
            return list;
        }
        if (arr[index]==target){
            list.add(index);
        }
        return helperForLinearSearchList(arr,target,index+1,list);
    }

}

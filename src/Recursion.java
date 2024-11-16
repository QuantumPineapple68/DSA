import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Recursion {
    public static void main(String[] args) {
        int[] arr = {55, 32, 14, 62, 7, 89, 2};
        System.out.println(Arrays.toString(bubbleSort(arr)));
    }


    static void number1 (int n){
        System.out.println(n);
        number2(2);
    }

    static void number2(int n) {
        System.out.println(n);
        number3(3);
    }

    static void number3 (int n){
        System.out.println(n);
    }

    static void number (int n){
        if (n>3){
            return;
        }
        System.out.println(n);
        number(n+1);
    }



    static int search(int[] arr, int target, int s, int e) {
        if (s > e) {
            return -1;
        }
        int m = s + (e - s) / 2;
        if (arr[m] == target) {
            return m;
        }
        if (target < arr[m]) {
            return search(arr, target, s, m - 1);
        }
        return search(arr, target, m + 1, e);
    }



    static int fbs(int n){

        if (n<2){
            return n;
        }
        return fbs(n-1) + fbs (n-2);
    }



    static void getFact (int num , int fact){
        if (num==0){
            System.out.println(fact);
            return; 
        }
        fact = fact*num;
        getFact(num-1,fact);
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


    static int[] bubbleSort (int[] arr){
        int index =0;
        int count =0;
        return helperForBubbleSort(arr,index,count);
    }

    private static int[] helperForBubbleSort(int[] arr, int index,int count) {
        if (index == arr.length && count ==arr.length){
            return arr;
        }
        if (index == arr.length){
            return helperForBubbleSort(arr,0,count+1);
        }
        if (index != arr.length-1 && arr[index]>arr[index+1]){
            int temp = arr[index];
            arr[index]=arr[index+1];
            arr[index+1]= temp;
        }
        return helperForBubbleSort(arr,index+1,count);
    }
}

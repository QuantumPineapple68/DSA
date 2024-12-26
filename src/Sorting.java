import java.util.ArrayList;
import java.util.Arrays;

import static java.util.Collections.sort;

public class Sorting {
    public static void main(String[] args) {
        int[] arr = {1,2,0,6,3,4};
        System.out.println((Arrays.toString(mergeSort(arr))));
    }


    static int[] bubbleSort(int[] arr) {

        for (int i = 0; i < arr.length; i++) {
            boolean swapped = false;
            for (int j = 1; j < arr.length - i; j++) {
                if (arr[j - 1] > arr[j]) {
                    int temp = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = temp;
                    swapped=true;
                }
            }
            if (!swapped){
                break;
            }
        }
        return arr;
    }

    static int[] cyclicSort1(int[] arr){
        int i=0;
        while(i<arr.length){
            int correct = arr[i] -1;
            if (arr[i] != arr[correct]){
                swap(arr, i , correct);
            }
            else{
                i++;
            }
        }
        return arr;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    static int cyclicSort(int[] nums){
        int i=0;
        while(i<nums.length){
            int correct = nums[i]-1;
            if (nums[i]>0 && nums[i]<= nums.length && nums[i] != nums[correct]) {
                swap(nums, i, correct);
            } else {
                i++;
            }
        }
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] !=j+1) {
                return j+1;
            }
        }
        return nums.length+1;
    }

    static void selection(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            // find the max item in the remaining array and swap with correct index
            int last = arr.length - i - 1;
            int maxIndex = getMaxIndex(arr, 0, last);
            swap(arr, maxIndex, last);
        }
    }
    static int getMaxIndex(int[] arr, int start, int end) {
        int max = start;
        for (int i = start; i <= end; i++) {
            if (arr[max] < arr[i]) {
                max = i;
            }
        }
        return max;
    }
    static void insertion(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = i+1; j > 0; j--) {
                if (arr[j] < arr[j-1]) {
                    swap(arr, j, j-1);
                } else {
                    break;
                }
            }
        }
    }

    static int[] mergeSort(int[] arr){
        if (arr.length==1){
            return arr;
        }
        int mid = arr.length/2;

        int[] first = mergeSort(Arrays.copyOfRange(arr,0,mid));
        int[] second = mergeSort(Arrays.copyOfRange(arr,mid,arr.length));

        return merge(first,second);
    }

    private static int[] merge(int[] first, int[] second) {
        int[] mix = new int[first.length + second.length];

        int i = 0;
        int j = 0;
        int k = 0;

        while (i < first.length && j < second.length) {
            if (first[i] < second[j]) {
                mix[k] = first[i];
                i++;
            } else {
                mix[k] = second[j];
                j++;
            }
            k++;
        }

        while (i < first.length) {
            mix[k] = first[i];
            i++;
            k++;
        }

        while (j < second.length) {
            mix[k] = second[j];
            j++;
            k++;
        }
        return mix;
    }

    String removeA(String noa){
        String ans="";
        int i=0;
        char[] noaC= noa.toCharArray();
        helperRemoveA(noaC,ans,i);
        return ans;
    }
    private static void helperRemoveA(char[] noa, String ans, int i) {
        if (i == noa.length) {
            return;
        }
        if (i == 'a') {
            helperRemoveA(noa, ans, i + 1);
        }
        else {

            helperRemoveA(noa,ans,i+1);
        }
    }


}
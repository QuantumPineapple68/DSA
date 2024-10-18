import static java.util.Collections.sort;

public class Sorting {
    public static void main(String[] args) {
        int[] arr = {1,2,0};
        System.out.println((cyclicSort(arr)));
    }

    static int[] binarySearchIn2D(int[][] arr, int target) {
        int r = 0;
        int c = arr.length - 1;

        while (r < arr.length && c >= 0) {
            if (arr[r][c] == target) {
                return new int[]{r, c};
            }
            if (arr[r][c] > target) {
                c--;
            } else {
                r++;
            }
        }
        return new int[]{-1, -1};
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
}
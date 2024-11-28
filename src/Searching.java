public class Searching {
    public static void main(String[] args) {

        int[] arr = { -4, -3, -2 ,0 ,1, 4 , 5, 6, 9 ,13, 16, 34, 45, 55};
        int target = 8;
        int a = isAccOrDcc(arr);
        int ans =0;
        if (a == 1){
            ans = BinarySearchAcc(arr, target);
        }
        else if (a == -1){
            ans = BinarySearchDcc(arr, target);
        }
        else {
            System.out.println("Please Provide Sorted array");
        }

        System.out.println(ans);
    }

    static int BinarySearchAcc(int[] arr, int target){
        int start = 0;
        int end = arr.length -1;

        while ( start <= end){

            int mid = (start+end)/2;
            if (target > arr[mid]){
                start = mid +1;
            }
            else if (target < arr[mid]){
                end = mid -1;
            }
            else{
                return arr[mid+1];
            }
        }
        return arr[0];
    }

    static int BinarySearchDcc(int[] arr, int target){
        int start = 0;
        int end = arr.length -1;

        while ( start <= end){

            int mid = start + (end - start)/2;
            if (target < arr[mid]){
                start = mid +1;
            }
            else if (target > arr[mid]){
                end = mid -1;
            }
            else{
                return mid;
            }
        }
        return -1;
    }

    static boolean isAcc(int[] arr){

        int trueCount = 0;
        for (int i = 0; i < arr.length-1 ; i++) {
            if (arr[i] < arr[i+1]){
                trueCount++;
            }
        }
        if(trueCount == arr.length-1){
            return true;
        }
        return false;
    }

    static boolean isDcc(int[] arr){

        int trueCount = 0;
        for (int i = 0; i < arr.length-1 ; i++) {
            if (arr[i] > arr[i+1]){
                trueCount++;
            }
        }
        if(trueCount == arr.length-1){
            return true;
        }
        return false;
    }

    static int isAccOrDcc(int[] arr){
        if(isAcc(arr)){
            return 1;
        }
        else if (isDcc(arr)){
            return -1;
        }
        return 0;
    }
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }

    static int binarySearch(int[] arr, int target) {
        int start = 0;
        int end = arr.length - 1;

        while(start <= end) {
            // find the middle element
//            int mid = (start + end) / 2; // might be possible that (start + end) exceeds the range of int in java
            int mid = start + (end - start) / 2;

            if (target < arr[mid]) {
                end = mid - 1;
            } else if (target > arr[mid]) {
                start = mid + 1;
            } else {
                // ans found
                return mid;
            }
        }
        return -1;
    }
    
}
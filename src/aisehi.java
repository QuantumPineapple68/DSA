public class aisehi {
    public static void main(String[] args) {
        char[] letters = {'c', 'f', 'j'};
        char target = 'c';
    }

    static int findIt(int[] arr, int target) {

        int start = 0;
        int end = arr.length - 1;

        while (start <= end) {

            int mid = (start + end) / 2;
            if (target > arr[mid]) {
                start = mid + 1;
            } else if (target < arr[mid]) {
                end = mid - 1;
            }
            else {
                return mid;
            }
        }
        return -1;
    }

    private int searchBinary(int[] arr) {
        int start = 0;
        int end = arr.length - 1;

        while (start <= end) {

            int mid = (start + end) / 2;
            if (arr[mid] > arr[mid+1]) {
                end = mid;
            } else if (arr[mid] < arr[mid+1]) {
                start = mid + 1;
            }
            else if (start == end){
                return mid;
            }
        }
        return -1;
    }

    public int search(int[] nums, int target){
        int peak = findPeakElement(nums);
        int firstTry = orderAgnosticBS(nums, target, 0, peak);
        if (firstTry != -1){
            return firstTry;
        }
        else{
            return orderAgnosticBS(nums, target, peak+1, nums.length-1);
        }

    }

    public static int findPeakElement(int[] arr) {
        int start = 0;
        int end = arr.length - 1;

        while (start < end) {

            int mid = (start + end) / 2;
            if (arr[mid] > arr[mid+1]) {
                end = mid;
            } else {
                start = mid + 1;
            }
        }
        return start;
    }

    static int orderAgnosticBS(int[] arr, int target, int start, int end) {

        // find whether the array is sorted in ascending or descending
        boolean isAsc = arr[start] < arr[end];

        while(start <= end) {
            // find the middle element
         //   int mid = (start + end) / 2; // might be possible that (start + end) exceeds the range of int in java
            int mid = start + (end - start) / 2;

            if (arr[mid] == target) {
                return mid;
            }

            if (isAsc) {
                if (target < arr[mid]) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            } else {
                if (target > arr[mid]) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            }
        }
        return -1;
    }

    static int search(int[] nums, int target){
        int pivot = findPivot(nums);
        if (pivot == -1){
            return BinarySearchDcc(nums, target, 0, nums.length-1);
        }
        if (nums[pivot] == target){
            return pivot;
        }
        if (nums[0] >= target){
            return BinarySearchDcc(nums, target, pivot+1, nums.length-1);
        }
        if (nums[0] <= target){
            return BinarySearchDcc(nums, target, 0, pivot-1);
        }
        return -1;
    }

    static int findPivot(int[] arr){
        int start = 0;
        int end = arr.length-1;
        while (start <= end){
            int mid = (start+end)/2;
            if (arr[mid] > arr[mid+1]){
                return mid;
            }
            if (arr[mid] < arr[mid-1]){
                return mid-1;
            }
            if (arr[mid] >= arr[start]){
                start=mid+1;
            }
            if (arr[mid] <= arr[start]){
                mid = end-1;
            }
        }
        return -1;
    }

    static int BinarySearchDcc(int[] arr, int target, int start, int end){

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



}



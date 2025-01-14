package Strings;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Questions {
    public static void main(String[] args) {
//        String[] input = {"eat", "tea", "tan", "ate", "nat", "bat"};
//        List<List<String>> result = groupAnagrams(input);
//
//        System.out.println("Grouped Anagrams:");
//        for (List<String> group : result) {
//            System.out.print(group);
//        }

        int[] arr = {1,3,4,5,0,0,0};
        int[] arr2 = {4,6,7};
        merge(arr,4,arr2,3);

    }

    static ArrayList<String> diceRet(String p, int target) {
        if (target == 0) {
            ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }
        ArrayList<String> list = new ArrayList<>();
        for (int i = 1; i <= 6 && i <= target; i++) {
            list.addAll(diceRet(p + i, target - i));
        }
        return list;
    }

    static public List<String> letterCombinations(String digits){
        String p = "";
        return helperLetterCombinations(p,digits);
    }

    private static List<String> helperLetterCombinations(String p, String up) {
        if (up.isEmpty()) {
            ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }

        int digit = up.charAt(0) - '0'; // converts '2' into 2

        ArrayList <String> list = new ArrayList<>();
        for (int i = (digit-1)*3; i < digit*3; i++) {
            char ch = (char) ('a' + i);
            list.addAll(helperLetterCombinations(p+ch, up.substring(1)));
        }
        return list;
    }

        static public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];

        for (int num : nums){
            currentSum = Math.max(num, currentSum + num);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }

    public static boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);
        for (int i = 0; i < nums.length-1; i++) {
            if (nums[i] == nums[i+1]){
                return true;
            }
        }
        return false;
    }

    public static List<List<String>> groupAnagrams(String[] strs) {
        HashMap<String, List<String>> map = new HashMap<>();
        for (String str : strs) {
            char[] chars = str.toCharArray();
            java.util.Arrays.sort(chars);
            String sortedStr = new String(chars);

            if (!map.containsKey(sortedStr)) {
                map.put(sortedStr, new ArrayList<>());
            }
            map.get(sortedStr).add(str);
        }
        return new ArrayList<>(map.values());
    }

    public static int[] repeatedNumber(final int[] A) {
        int missing = 0;
        int repeated =0;
        Arrays.sort(A);
        int max = A[0];
        int min = A[A.length-1];

        for (int i = 0; i < A.length-1; i++) {
            if (A[i]==A[i+1]){
                repeated=A[i];
            }
        }

        for (int i = min; i < max; i++) {
            int index = Arrays.binarySearch(A,A[i]);
            if (index == -1){
                missing = A[i];
            }
        }

        return new int[] {repeated,missing};
    }

    public static int removeDuplicates(int[] nums) {
        if (nums == null || nums.length == 0) {
            return 0; // Handle edge case of an empty array
        }

        int writePtr = 1; // Position for the next unique element
        for (int readPtr = 1; readPtr < nums.length; readPtr++) {
            if (nums[readPtr] != nums[writePtr - 1]) { // Compare current with last unique
                nums[writePtr] = nums[readPtr]; // Update the array in place
                writePtr++; // Move to the next position for unique elements
            }
        }

        return writePtr;
    }

    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int num2Count=0;
        for (int i = m; i < m+n; i++) {
            if (nums1[i]==0){
                nums1[i]=nums2[num2Count];
                num2Count++;
            }
        }
        Arrays.sort(nums1);
        System.out.println(Arrays.toString(nums1));
    }

    public static List<List<Integer>> permute(int[] nums) {
        if (nums.length==0){
            List<List<Integer>> list = new ArrayList<>();
            list.addAll();
            return list;
    }

}

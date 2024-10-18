import java.util.Arrays;
import java.util.Scanner;

import static java.util.Collections.swap;

public class Java_recursion_CWH {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.println("nums = ");
        int[] arr = new int[4];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = sc.nextInt();
        }
        System.out.println("Target : ");
        int target = sc.nextInt();
        int [] ap=twoSum(arr,target);
        System.out.println(Arrays.toString(ap));



    }

    public static int[] twoSum(int[] nums, int target) {
        int[] result = new int[0];
        for (int j =0; j < nums.length; j++) {
            for (int i = j+1; i < nums.length; i++) {
                if (nums[i] + nums[j] == target) {
                    result = new int[]{i, j};
                    return result;
                }
            }
        }
        return result;

    }

    public int[] assending(int[] bb) {
        int[] ll = new int[0];
        ll = bb;
        if (ll[0] > ll[1]) {
            int k = ll[0];
            ll[0] = ll[1];
            ll[1] = k;
            return ll;
        } else {
            return bb;
        }
    }
}


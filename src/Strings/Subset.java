package Strings;

import java.util.ArrayList;
import java.util.List;

public class Subset {
    public static void main(String[] args) {
        int[] arr = {1,2,3};
        System.out.println(subset(arr));
//        System.out.println(letterCombinations("23"));
    }


    static List<List<Integer>> subset (int[] arr){
        List<List<Integer>> outer = new ArrayList<>();

        outer.add(new ArrayList<>());

        for (int num : arr){
            int n = outer.size();
            for (int i = 0; i < n; i++) {
                ArrayList<Integer> inner = new ArrayList<>(outer.get(i));
                inner.add(num);
                outer.add(inner);
            }
        }
        return outer;
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

}

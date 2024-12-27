package Strings;

import java.util.ArrayList;
import java.util.List;

public class Questions {
    public static void main(String[] args) {
        System.out.println(diceRet("",4));
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
}

package Strings;

import java.util.ArrayList;

public class subseq {
    public static void main(String[] args) {
        System.out.println(subseqRet("","abs"));
    }

    static void subseq (String pr, String unPr){
        if (unPr.isEmpty()){
            System.out.println(pr);
            return;
        }

        char ch = unPr.charAt(0);
        subseq(pr, unPr.substring(1));
        subseq(pr + ch, unPr.substring(1));
    }


    static ArrayList<String> subseqRet (String pr, String unPr){
        if (unPr.isEmpty()){
            ArrayList<String> list = new ArrayList<>();
            list.add(pr);
            return list;
        }

        char ch = unPr.charAt(0);
        ArrayList<String> left = subseqRet(pr + ch, unPr.substring(1));
        ArrayList<String> right = subseqRet(pr, unPr.substring(1));

        left.addAll(right);
        return left;
    }
}

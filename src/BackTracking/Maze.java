package BackTracking;

import java.util.ArrayList;
import java.util.List;

public class Maze {
    public static void main(String[] args) {
        System.out.println(mazeRetListDiagonal("",3,3));
    }

    static void maze(String p, int a, int b){
        if (a==1 && b==1){
            System.out.println(p);
            return;
        }

        if (a>1) {
            maze(p + 'D', a - 1, b);
        }
        if (b>1){
        maze(p+'R',a,b-1);
        }
    }

    static ArrayList<String> mazeRetList(String p, int a, int b){
        if (a==1 && b==1){
            ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }

        ArrayList<String> list = new ArrayList<>();

        if (a>1) {
            list.addAll(mazeRetList(p + 'D', a - 1, b));
        }
        if (b>1){
            list.addAll(mazeRetList(p+'R',a,b-1));
        }
        return list;

    }

    static ArrayList<String> mazeRetListDiagonal(String p, int a, int b){
        if (a==1 && b==1){
            ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }

        ArrayList<String> list = new ArrayList<>();

        if (a>1) {
            list.addAll(mazeRetListDiagonal(p + 'D', a - 1, b));
        }
        if (b>1){
            list.addAll(mazeRetListDiagonal(p+'R',a,b-1));
        }
        if (a>1 && b>1){
            list.addAll(mazeRetListDiagonal(p+'d',a-1,b-1));
        }

        return list;

    }
}

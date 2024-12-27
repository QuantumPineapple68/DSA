package BackTracking;

import java.util.ArrayList;
import java.util.List;

public class Maze {
    public static void main(String[] args) {
        maze("",3,3);
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
}

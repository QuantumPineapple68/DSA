package BackTracking;

import java.util.ArrayList;
import java.util.List;

public class Maze {
    public static void main(String[] args) {

        boolean[][] board = {
                {true,true,true},
                {true,false,true},
                {true,true,true}
        };
//        System.out.println(mazeRetListDiagonal("",0,0));
        mazeRetListObstacles("",board,0,0);
    }

    static void maze(String p, int a, int b){
        if (a==2 && b==2){
            System.out.println(p);
            return;
        }

        if (a<2) {
            maze(p+'D',a+1,b);
        }
        if (b<2){
            maze(p+'R',a,b+1);
        }
    }

    static ArrayList<String> mazeRetList(String p, int a, int b){
        if (a==2 && b==2){
            ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }

        ArrayList<String> list = new ArrayList<>();

        if (a<2) {
            list.addAll(mazeRetList(p + 'D', a+1, b));
        }
        if (b<2){
            list.addAll(mazeRetList(p+'R',a,b+1));
        }
        return list;

    }

    static ArrayList<String> mazeRetListDiagonal(String p, int a, int b){
        if (a==2 && b==2){
            ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }

        ArrayList<String> list = new ArrayList<>();

        if (a<2) {
            list.addAll(mazeRetListDiagonal(p+'D', a+1, b)); // L = left
        }
        if (b<2){
            list.addAll(mazeRetListDiagonal(p+'R',a,b+1)); // R = right
        }
        if (a<2 && b<2){
            list.addAll(mazeRetListDiagonal(p+'d',a+1,b+1)); // d = diagonal
        }
        return list;
    }

    // If in the maze of 3x3, if we have obstacle at 2,2 (boolean matrix) [considering cell counting starts as 3,2,1]
    static ArrayList<String> mazeRetListObstacles(String p, int a, int b){
        if (a==1 && b==1){
            ArrayList<String> list = new ArrayList<>();
            list.add(p);
            return list;
        }

        ArrayList<String> list = new ArrayList<>();

        if (a>1 && (a!=2 || b!=2)) {
            list.addAll(mazeRetListObstacles(p + 'D', a - 1, b));
        }
        if (b>1 && (a!=2 || b!=2)){
            list.addAll(mazeRetListObstacles(p+'R',a,b-1));
        }
        if (a>1 && b>1 && (a!=2 || b!=2)){
            list.addAll(mazeRetListObstacles(p+'d',a-1,b-1)); // d = diagonal
        }

        return list;
    }

    // Here, a and b are starting point to reach towards the bottom-most last cell with given restrictions
    static void mazeRetListObstacles(String p, boolean[][] maze, int a, int b){
        if (a==maze.length-1 && b==maze[0].length-1){
            System.out.println(p);
            return;
        }

        if (!maze[a][b]){
            return;
        }

        if (a<maze.length-1) {
            mazeRetListObstacles(p+'D',maze,a + 1, b);
        }
        if (b<maze[0].length-1){
            mazeRetListObstacles(p+'R',maze, a,b+1);
        }
        if (a<maze.length-1 && b<maze[0].length-1){
            mazeRetListObstacles(p+'d',maze,a+1,b+1); // d = diagonal
        }
    }
}

import java.util.Scanner;

public class TicTacToe {
    public static void main(String[] args) {
        char[][] board = new char[3][3];
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[row].length; col++) {
                board[row][col] = ' ';
            }
        }

        char player = 'X';
        boolean hasWon = false;
        Scanner sc = new Scanner(System.in);
        int empty = 9;

        while (!hasWon && empty != 0){
            printBoard(board);
            System.out.println("Player " + player + " Enter: ");
            int row = sc.nextInt();
            int col = sc.nextInt();

            if (board[row][col] == ' '){
                board[row][col] = player;
                empty--;
                System.out.println(empty);
            }
            else{
                System.out.println("Invalid Move, Try again!"); 
                continue;
            }
            hasWon = didAnyOneWon(board, player);
            if (hasWon){
                System.out.println("PLAYER " + player + " HAS WON THE GAME !!!");
                printBoard(board);
            }
            else {
                player = player == 'X' ? 'O' : 'X';
            }
        }
        System.out.println("Uh Oh .. Seems like it's a draw!!");
    }

    private static void printBoard(char[][] board) {
        for (int row = 0; row < board.length; row++) {
            for (int col = 0; col < board[row].length; col++) {
                System.out.print(board[row][col] + " | ");
            }
            System.out.println();
        }
    }

    private static boolean didAnyOneWon(char[][] board, char player) {
        for (int row = 0; row < board.length; row++) {
            if (board[row][0] == player && board[row][1] == player && board[row][2] == player) return true;
        }
        for (int col = 0; col < board.length; col++) {
            if (board[0][col] == player && board[1][col] == player && board[2][col] == player) return true;
        }

        if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return true;
        if (board[0][2] == player && board[1][1] == player && board[2][0] == player) return true;
        return false;
    }
}

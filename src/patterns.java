public class patterns {
    public static void main(String[] args) {
        pattern35(4);
    }

    static void pattern1(int n) {
        for (int i = 1; i <= 2 * n - 1; i++) {
            if (i <= n) {
                for (int space = 0; space < n - i; space++) {
                    System.out.print(" ");
                }
                for (int j = 1; j <= i; j++) {
                    System.out.print(j + " ");
                }
            } else {
                for (int space = 1; n <= i - space; space++) {
                    System.out.print(" ");
                }
                for (int j = 1; j <= 2 * n - i; j++) {
                    System.out.print(j + " ");
                }
            }
            System.out.println();
        }
    }

    static void pattern2(int n) {
        for (int i = 0; i <= n; i++) {
            for (int space = 0; space < n - i; space++) {
                System.out.print("  ");
            }
            for (int j = i; j >= 1; j--) {
                System.out.print(j + " ");
            }
            for (int j = 2; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }

    static void pattern35(int n) {
        for (int i = 1; i <= n; i++) {
            // Print the left half (increasing sequence)
            for (int j = 1; j <= i; j++) {
                System.out.print(j);
            }

            // Print the spaces in the middle
            for (int k = 1; k <= (2 * (n - i)); k++) {
                System.out.print(" ");
            }

            // Print the right half (decreasing sequence)
            for (int j = i; j >= 1; j--) {
                System.out.print(j);
            }

            // Move to the next line after each row
            System.out.println();
        }
    }

    static void pattern23(int n){
        for (int i = 1; i <= n ; i++) {
            for (int innner = 1; innner <= 3*n ; innner++) {
                
            }
        }
    }


}



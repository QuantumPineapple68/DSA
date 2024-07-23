import java.util.Scanner;

public class main_day02 {
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter 1st number of 1st row : Matrix 1");
        int a11 = sc.nextInt();

        System.out.println("Enter 2nd number of 1st row : Matrix 1");
        int a12 = sc.nextInt();

        System.out.println("Enter 1st number of 2nd row : Matrix 1");
        int a21 = sc.nextInt();

        System.out.println("Enter 2nd number of 2nd row : Matrix 1");
        int a22 = sc.nextInt();

        System.out.println("Alright !! Seems good enough .. now 2nd Matrix .. ");

        System.out.println("Enter 1st number of 1st row : Matrix 2");
        int b11 = sc.nextInt();

        System.out.println("Enter 2nd number of 1st row : Matrix 2");
        int b12 = sc.nextInt();

        System.out.println("Enter 1st number of 2nd row : Matrix 2");
        int b21 = sc.nextInt();

        System.out.println("Enter 2nd number of 2nd row : Matrix 2");
        int b22 = sc.nextInt();

        System.out.println("");
        System.out.println("The Multiplication of given Matrix is : ");

        System.out.print(a11*b11+a12*b21 + " ");
        System.out.println(a11*b12+a12*b22);

        System.out.print(a21*b11+a22*b21 + " ");
        System.out.println(a21*b12+a22*b22);
    }

}

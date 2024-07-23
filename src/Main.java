import java.util.Scanner;

public class Main {
    public static void main(String[] args)
    {
        Scanner s = new Scanner(System.in);
        System.out.println("Type Markrs of subject 1 out of 100: ");
        int a = s.nextInt();
        System.out.println("Type Markrs of subject 2: ");
        int b = s.nextInt();
        System.out.println("Type Markrs of subject 3: ");
        int c = s.nextInt();
        System.out.println("Type Markrs of subject 4: ");
        int d = s.nextInt();
        System.out.println("Type Markrs of subject 5: ");
        int e = s.nextInt();
        int totalMarks=a+b+c+d+e;
        int percentage = totalMarks*100/500;
        System.out.println("Your Percentage are : "+ percentage +"%");
        System.out.println("");


        System.out.println("What's your name bro ?");
        String name = s.next();
        System.out.println(name+" ??? heyyy .. Heloo yrr "+name+" !! kaise ho ?");
        System.out.println("");


        System.out.println("Enter Kilometers to convert in Miles : ");
        int km = s.nextInt();
        System.out.println(km+" Kilometers are "+km*0.621371+" Miles, Brother!");
    }
}
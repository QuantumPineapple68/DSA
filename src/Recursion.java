public class Recursion {
    public static void main(String[] args) {
        System.out.println(fbs(50));
    }
    static int fbs(int n){

        if (n<2){
            return n;
        }
        return fbs(n-1) + fbs (n-2);
    }
}

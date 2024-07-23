public class Java_recursion_CWH {

    public static void main(String[] args)
    {
        class printName {
            public static int add (int a,int b)
            {
                int z =a+b;
                return z;
            }
            public static int mul (int a,int b)
            {
                int x =a*b;
                return x;
            }
        }



        System.out.println(printName.add (4,6));
        System.out.println(printName.mul (4,6));

    }
}

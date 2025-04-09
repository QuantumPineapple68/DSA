package LeetCode;
import java.util.Stack;

public class ValidParenthesis {
    public static void main(String[] args) {
        System.out.println(isValid("{{{"));
    }

    public static int isValid(String s){
        Stack<Character> stack = new Stack<>();
        int count = 0;
        for (char i : s.toCharArray()) {
            if (i =='}'){
                if (stack.isEmpty() || stack.pop() != '{'){
                    count++;
                }
            } else if (i ==']'){
                if (stack.isEmpty() || stack.pop() != '['){
                    count++;
                }
            } else if (i ==')'){
                if (stack.isEmpty() || stack.pop() != '('){
                    count++;
                }
            }
            else stack.push(i);
        }
        while (!stack.isEmpty()){
            count++;
            stack.pop();
        }
        return count;
    }
}

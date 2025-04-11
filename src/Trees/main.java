package Trees;

import java.util.Scanner;

public class main {
    public static void main(String[] args) {
//        BinaryTree binaryTree = new BinaryTree();
//        Scanner scanner = new Scanner(System.in);
//        binaryTree.populate(scanner);
//        binaryTree.prettyDisplay();

        BST bst = new BST();
        int[] nums = {43,23,22,65,23,89,21,12,64,54,67,12,66};
        bst.populate(nums);
        bst.display();
    }
}

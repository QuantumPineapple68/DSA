package Tries;

public class main {
    public static void main(String[] args) {
        String[] words = {"the", "a", "there", "their", "any", "thee"};
        for (String word : words) {
            Trie.insert(word);
        }

        System.out.println(Trie.search("the"));
        System.out.println(Trie.search("thee"));

    }
}

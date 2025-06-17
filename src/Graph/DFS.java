package Graph;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Stack;

public class DFS {
    public static void dfs(ArrayList<Edge>[] graph){
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[graph.length];
        stack.push(0);

        while (!stack.isEmpty()){
            int curr = stack.pop();

            if (!visited[curr]){
                System.out.print(curr + " ");
                visited[curr] = true;

                Collections.sort(graph[curr], Comparator.comparingInt(e -> e.des)); // Sort neighbors by destination node for predictable traversal OPTIONAL

                for (int i = 0; i < graph[curr].size(); i++) {
                    Edge e = graph[curr].get(i);
                    if (!visited[e.des]) {
                        stack.push(e.des);
                    }
                }
            }
        }
    }
}

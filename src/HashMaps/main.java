package HashMaps;

public class main {
    public static void main(String[] args) {
        MapUsingHash map = new MapUsingHash();

        map.put("Nachiket", "No one yet");
        map.put("Abhishek", "Tirtha");
        map.put("Jaydeep", "Sakshi");

        System.out.println(map.get("Jaydeep"));
    }
}

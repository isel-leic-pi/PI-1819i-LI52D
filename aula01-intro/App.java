class Student {
    public int nr; 
    public String name;
}

public class App {
    public static void main(String [] args) {
        var std = new Student();
        std.nr = 8736;
        // std.address = "Rua das Papolias"; => erro de compilação
        
        std = true;  // Erro de compilação
    }
}

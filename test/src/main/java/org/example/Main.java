package org.example;

import org.example.Entities.Chat;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    static void main() {
        Chat chat=new Chat("Lynette", 3, "grise");
            System.out.println(chat);
            chat.miauler();
    }
}

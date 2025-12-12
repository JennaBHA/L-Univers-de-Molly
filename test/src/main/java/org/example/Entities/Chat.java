package org.example.Test;

public class Chat {
    private String nom;
    private int age;
    private String couleur;

    public Chat(){
    //mettre un constructeur vide
    }

    @Override
    public String toString() {
        return "Chat{" +
                "nom='" + nom + '\'' +
                ", age=" + age +
                ", couleur='" + couleur + '\'' +
                '}';
    }

    public Chat(String nom, int age, String couleur) {
        this.nom = nom;
        this.age = age;
        this.couleur = couleur;
    }

    public void miauler(){
        System.out.println(nom + " dit : Miaou !");
    }
}

package com.example.tch099_em.modele;

public class ModeleManager {
    private static Modele modele = null;

    public static Modele getModele() {
        if (modele == null)
            modele = new Modele();
        return modele;
    }

    public static boolean detruire() {
        boolean detruit = true;

        if (modele != null)
            modele = null;
        else
            detruit = false;

        return detruit;
    }
}

package com.example.tch099_em.authentification;

public class LoginResponse {
    public static class Utilisateur {
        private String id_utilisateur;
        private String nom;
        private String email;
        private String role_utilisateur;


        public String getId_utilisateur() {
            return id_utilisateur;
        }

        public void setId_utilisateur(String id_utilisateur) {
            this.id_utilisateur = id_utilisateur;
        }

        public String getNom() {
            return nom;
        }

        public void setNom(String nom) {
            this.nom = nom;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getRole_utilisateur() {
            return role_utilisateur;
        }

        public void setRole_utilisateur(String role_utilisateur) {
            this.role_utilisateur = role_utilisateur;
        }
    }

    private Utilisateur utilisateur;
    private String id;
    private String token;


    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}

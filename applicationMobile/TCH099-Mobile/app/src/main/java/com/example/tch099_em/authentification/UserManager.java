package com.example.tch099_em.authentification;

import com.example.tch099_em.modele.entite.User;

public class UserManager {
    private static UserManager instance;
    private User userCourant;

    private UserManager() {}

    public static synchronized UserManager getInstance() {
        if (instance == null) {
            instance = new UserManager();
        }
        return instance;
    }

    public User getUserCourant() {
        return userCourant;
    }

    public void setUserCourant(User userCourant) {
        this.userCourant = userCourant;
    }

    public boolean estConnecte() {
        return userCourant != null;
    }

}

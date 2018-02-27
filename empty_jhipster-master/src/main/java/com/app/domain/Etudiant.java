package com.app.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Etudiant.
 */
@Entity
@Table(name = "etudiant")
public class Etudiant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nom")
    private String nom;
    
    @Column(name = "presnom")
    private String presnom;
    
    @Column(name = "age")
    private String age;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }
    
    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPresnom() {
        return presnom;
    }
    
    public void setPresnom(String presnom) {
        this.presnom = presnom;
    }

    public String getAge() {
        return age;
    }
    
    public void setAge(String age) {
        this.age = age;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Etudiant etudiant = (Etudiant) o;
        if(etudiant.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, etudiant.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Etudiant{" +
            "id=" + id +
            ", nom='" + nom + "'" +
            ", presnom='" + presnom + "'" +
            ", age='" + age + "'" +
            '}';
    }
}

package com.app.web.rest.dto;

import java.io.Serializable;
import java.util.Objects;


/**
 * A DTO for the Etudiant entity.
 */
public class EtudiantDTO implements Serializable {

    private Long id;

    private String nom;


    private String presnom;


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

        EtudiantDTO etudiantDTO = (EtudiantDTO) o;

        if ( ! Objects.equals(id, etudiantDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "EtudiantDTO{" +
            "id=" + id +
            ", nom='" + nom + "'" +
            ", presnom='" + presnom + "'" +
            ", age='" + age + "'" +
            '}';
    }
}

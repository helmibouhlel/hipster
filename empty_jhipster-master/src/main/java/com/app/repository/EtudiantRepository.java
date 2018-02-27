package com.app.repository;

import com.app.domain.Etudiant;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Etudiant entity.
 */
public interface EtudiantRepository extends JpaRepository<Etudiant,Long> {

}

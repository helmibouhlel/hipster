package com.app.web.rest.mapper;

import com.app.domain.*;
import com.app.web.rest.dto.EtudiantDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Etudiant and its DTO EtudiantDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EtudiantMapper {

    EtudiantDTO etudiantToEtudiantDTO(Etudiant etudiant);

    Etudiant etudiantDTOToEtudiant(EtudiantDTO etudiantDTO);
}

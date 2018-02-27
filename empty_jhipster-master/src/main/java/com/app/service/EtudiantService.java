package com.app.service;

import com.app.domain.Etudiant;
import com.app.repository.EtudiantRepository;
import com.app.web.rest.dto.EtudiantDTO;
import com.app.web.rest.mapper.EtudiantMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Etudiant.
 */
@Service
@Transactional
public class EtudiantService {

    private final Logger log = LoggerFactory.getLogger(EtudiantService.class);
    
    @Inject
    private EtudiantRepository etudiantRepository;
    
    @Inject
    private EtudiantMapper etudiantMapper;
    
    /**
     * Save a etudiant.
     * @return the persisted entity
     */
    public EtudiantDTO save(EtudiantDTO etudiantDTO) {
        log.debug("Request to save Etudiant : {}", etudiantDTO);
        Etudiant etudiant = etudiantMapper.etudiantDTOToEtudiant(etudiantDTO);
        etudiant = etudiantRepository.save(etudiant);
        EtudiantDTO result = etudiantMapper.etudiantToEtudiantDTO(etudiant);
        return result;
    }

    /**
     *  get all the etudiants.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Etudiant> findAll(Pageable pageable) {
        log.debug("Request to get all Etudiants");
        Page<Etudiant> result = etudiantRepository.findAll(pageable); 
        return result;
    }

    /**
     *  get one etudiant by id.
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public EtudiantDTO findOne(Long id) {
        log.debug("Request to get Etudiant : {}", id);
        Etudiant etudiant = etudiantRepository.findOne(id);
        EtudiantDTO etudiantDTO = etudiantMapper.etudiantToEtudiantDTO(etudiant);
        return etudiantDTO;
    }

    /**
     *  delete the  etudiant by id.
     */
    public void delete(Long id) {
        log.debug("Request to delete Etudiant : {}", id);
        etudiantRepository.delete(id);
    }
}

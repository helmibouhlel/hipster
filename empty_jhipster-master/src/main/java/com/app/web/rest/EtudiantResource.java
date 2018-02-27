package com.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.app.domain.Etudiant;
import com.app.service.EtudiantService;
import com.app.web.rest.util.HeaderUtil;
import com.app.web.rest.util.PaginationUtil;
import com.app.web.rest.dto.EtudiantDTO;
import com.app.web.rest.mapper.EtudiantMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Etudiant.
 */
@RestController
@RequestMapping("/api")
public class EtudiantResource {

    private final Logger log = LoggerFactory.getLogger(EtudiantResource.class);
        
    @Inject
    private EtudiantService etudiantService;
    
    @Inject
    private EtudiantMapper etudiantMapper;
    
    /**
     * POST  /etudiants -> Create a new etudiant.
     */
    @RequestMapping(value = "/etudiants",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<EtudiantDTO> createEtudiant(@RequestBody EtudiantDTO etudiantDTO) throws URISyntaxException {
        log.debug("REST request to save Etudiant : {}", etudiantDTO);
        if (etudiantDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("etudiant", "idexists", "A new etudiant cannot already have an ID")).body(null);
        }
        EtudiantDTO result = etudiantService.save(etudiantDTO);
        return ResponseEntity.created(new URI("/api/etudiants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("etudiant", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /etudiants -> Updates an existing etudiant.
     */
    @RequestMapping(value = "/etudiants",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<EtudiantDTO> updateEtudiant(@RequestBody EtudiantDTO etudiantDTO) throws URISyntaxException {
        log.debug("REST request to update Etudiant : {}", etudiantDTO);
        if (etudiantDTO.getId() == null) {
            return createEtudiant(etudiantDTO);
        }
        EtudiantDTO result = etudiantService.save(etudiantDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("etudiant", etudiantDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /etudiants -> get all the etudiants.
     */
    @RequestMapping(value = "/etudiants",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional(readOnly = true)
    public ResponseEntity<List<EtudiantDTO>> getAllEtudiants(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Etudiants");
        Page<Etudiant> page = etudiantService.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/etudiants");
        return new ResponseEntity<>(page.getContent().stream()
            .map(etudiantMapper::etudiantToEtudiantDTO)
            .collect(Collectors.toCollection(LinkedList::new)), headers, HttpStatus.OK);
    }

    /**
     * GET  /etudiants/:id -> get the "id" etudiant.
     */
    @RequestMapping(value = "/etudiants/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<EtudiantDTO> getEtudiant(@PathVariable Long id) {
        log.debug("REST request to get Etudiant : {}", id);
        EtudiantDTO etudiantDTO = etudiantService.findOne(id);
        return Optional.ofNullable(etudiantDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /etudiants/:id -> delete the "id" etudiant.
     */
    @RequestMapping(value = "/etudiants/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        log.debug("REST request to delete Etudiant : {}", id);
        etudiantService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("etudiant", id.toString())).build();
    }
}

package com.mabanque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import javax.validation.Valid;

import com.mabanque.dao.DatRepository;
import com.mabanque.entity.Dat;
import com.mabanque.exception.ResourceNotFoundException;
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api")
public class DatController {
	@Autowired
    DatRepository datRepository;
	@GetMapping("/dat")
	public List<Dat> getAlldat() {
	    return datRepository.findAll();
	}
	//create new dat
	@PostMapping("/dat")
	public Dat createdat(@Valid @RequestBody Dat d) {
	    return datRepository.save(d);
	}
	//get single dat
	@GetMapping("/dat/{contrat}")
	public Dat getdat(@PathVariable(value = "contrat") Long contrat) {
	    return datRepository.findById(contrat)
	            .orElseThrow(() -> new ResourceNotFoundException("Dat", "contrat", contrat));
	}
	//deletedat
	@DeleteMapping("/dat/{contrat}")
	public ResponseEntity<?> deletedat(@PathVariable(value = "contrat") Long contrat) {
	    Dat d = datRepository.findById(contrat)
	            .orElseThrow(() -> new ResourceNotFoundException("Dat", "contrat", contrat));

	    datRepository.delete(d);

	    return ResponseEntity.ok().build();
	}
}

package com.mabanque.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"},   //Spring Boot uses Jackson for Serializing and Deserializing Java objects to and from JSON.
        allowGetters = true)
public class Dat implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8086695929026600480L;
	@Id @GeneratedValue   //to define the primary key
	private Long Contrat;
	@NotBlank
    private String Client;
	
	@Temporal(TemporalType.DATE)
    @CreatedDate

	private Date Datecreation;
	private int Tarification;
	private String Devise;
	public Dat(String client, Date datecreation, int tarification, String devise, String raison, String role) {
		super();
		Client = client;
		Datecreation = datecreation;
		Tarification = tarification;
		Devise = devise;
		Raison = raison;
		Role = role;
	}
	public Long getContrat() {
		return Contrat;
	}
	public void setContrat(Long contrat) {
		Contrat = contrat;
	}
	public String getClient() {
		return Client;
	}
	public void setClient(String client) {
		Client = client;
	}
	public Date getDatecreation() {
		return Datecreation;
	}
	public void setDatecreation(Date datecreation) {
		Datecreation = datecreation;
	}
	public int getTarification() {
		return Tarification;
	}
	public void setTarification(int tarification) {
		Tarification = tarification;
	}
	public String getDevise() {
		return Devise;
	}
	public void setDevise(String devise) {
		Devise = devise;
	}
	public String getRaison() {
		return Raison;
	}
	public void setRaison(String raison) {
		Raison = raison;
	}
	public String getRole() {
		return Role;
	}
	public void setRole(String role) {
		Role = role;
	}
	private String Raison;
	private String Role;
	public Dat() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

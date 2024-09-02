package com.example.demo.Modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="cliente")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idcliente;
	
	private String dnicliente;
    private String nomcliente;
    private String apecliente;
    private String dircliente;
    private String telfcliente;
    private String emailcliente;
    private String sexcliente;
    private Boolean estcliente;
	
    public Cliente() {
		super();
	}

	public Cliente(long idcliente, String dnicliente, String nomcliente, String apecliente, String dircliente,
			String telfcliente, String emailcliente, String sexcliente, Boolean estcliente) {
		super();
		this.idcliente = idcliente;
		this.dnicliente = dnicliente;
		this.nomcliente = nomcliente;
		this.apecliente = apecliente;
		this.dircliente = dircliente;
		this.telfcliente = telfcliente;
		this.emailcliente = emailcliente;
		this.sexcliente = sexcliente;
		this.estcliente = estcliente;
	}

	public long getIdcliente() {
		return idcliente;
	}

	public void setIdcliente(long idcliente) {
		this.idcliente = idcliente;
	}

	public String getDnicliente() {
		return dnicliente;
	}

	public void setDnicliente(String dnicliente) {
		this.dnicliente = dnicliente;
	}

	public String getNomcliente() {
		return nomcliente;
	}

	public void setNomcliente(String nomcliente) {
		this.nomcliente = nomcliente;
	}

	public String getApecliente() {
		return apecliente;
	}

	public void setApecliente(String apecliente) {
		this.apecliente = apecliente;
	}

	public String getDircliente() {
		return dircliente;
	}

	public void setDircliente(String dircliente) {
		this.dircliente = dircliente;
	}

	public String getTelfcliente() {
		return telfcliente;
	}

	public void setTelfcliente(String telfcliente) {
		this.telfcliente = telfcliente;
	}

	public String getEmailcliente() {
		return emailcliente;
	}

	public void setEmailcliente(String emailcliente) {
		this.emailcliente = emailcliente;
	}

	public String getSexcliente() {
		return sexcliente;
	}

	public void setSexcliente(String sexcliente) {
		this.sexcliente = sexcliente;
	}

	public Boolean getEstcliente() {
		return estcliente;
	}

	public void setEstcliente(Boolean estcliente) {
		this.estcliente = estcliente;
	}

    
}
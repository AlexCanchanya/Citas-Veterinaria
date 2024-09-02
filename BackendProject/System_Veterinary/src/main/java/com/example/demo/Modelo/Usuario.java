package com.example.demo.Modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idusuario;
	
	private String nomusuario;
	private String apeusuario;
	private String nickusuario;
	private String passusuario;
	private String rol;
	private Boolean estado;
	
	public Usuario() {
		super();
	}

	public Usuario(Long idusuario, String nomusuario, String apeusuario, String nickusuario, String passusuario,
			String rol, Boolean estado) {
		super();
		this.idusuario = idusuario;
		this.nomusuario = nomusuario;
		this.apeusuario = apeusuario;
		this.nickusuario = nickusuario;
		this.passusuario = passusuario;
		this.rol = rol;
		this.estado = estado;
	}

	public Long getIdusuario() {
		return idusuario;
	}

	public void setIdusuario(Long idusuario) {
		this.idusuario = idusuario;
	}

	public String getNomusuario() {
		return nomusuario;
	}

	public void setNomusuario(String nomusuario) {
		this.nomusuario = nomusuario;
	}

	public String getApeusuario() {
		return apeusuario;
	}

	public void setApeusuario(String apeusuario) {
		this.apeusuario = apeusuario;
	}

	public String getNickusuario() {
		return nickusuario;
	}

	public void setNickusuario(String nickusuario) {
		this.nickusuario = nickusuario;
	}

	public String getPassusuario() {
		return passusuario;
	}

	public void setPassusuario(String passusuario) {
		this.passusuario = passusuario;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}
	
	
	
}
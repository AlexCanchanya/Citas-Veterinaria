package com.example.demo.Modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "veterinario")
public class Veterinario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idveterinario;

    private String nomveterinario;
    private String apeveterinario;
    private String especialidadveterinario;
    private String telfveterinario;
    private String horarioatencion;
    private Boolean estveterinario;
	
    public Veterinario() {
		super();
	}

	public Veterinario(Long idveterinario, String nomveterinario, String apeveterinario, String especialidadveterinario,
			String telfveterinario, String horarioatencion, Boolean estveterinario) {
		super();
		this.idveterinario = idveterinario;
		this.nomveterinario = nomveterinario;
		this.apeveterinario = apeveterinario;
		this.especialidadveterinario = especialidadveterinario;
		this.telfveterinario = telfveterinario;
		this.horarioatencion = horarioatencion;
		this.estveterinario = estveterinario;
	}

	public Long getIdveterinario() {
		return idveterinario;
	}

	public void setIdveterinario(Long idveterinario) {
		this.idveterinario = idveterinario;
	}

	public String getNomveterinario() {
		return nomveterinario;
	}

	public void setNomveterinario(String nomveterinario) {
		this.nomveterinario = nomveterinario;
	}

	public String getApeveterinario() {
		return apeveterinario;
	}

	public void setApeveterinario(String apeveterinario) {
		this.apeveterinario = apeveterinario;
	}

	public String getEspecialidadveterinario() {
		return especialidadveterinario;
	}

	public void setEspecialidadveterinario(String especialidadveterinario) {
		this.especialidadveterinario = especialidadveterinario;
	}

	public String getTelfveterinario() {
		return telfveterinario;
	}

	public void setTelfveterinario(String telfveterinario) {
		this.telfveterinario = telfveterinario;
	}

	public String getHorarioatencion() {
		return horarioatencion;
	}

	public void setHorarioatencion(String horarioatencion) {
		this.horarioatencion = horarioatencion;
	}

	public Boolean getEstveterinario() {
		return estveterinario;
	}

	public void setEstveterinario(Boolean estveterinario) {
		this.estveterinario = estveterinario;
	}	
    
}
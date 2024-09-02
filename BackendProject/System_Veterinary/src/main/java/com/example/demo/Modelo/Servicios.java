package com.example.demo.Modelo;

import java.math.BigDecimal;
import jakarta.persistence.*;

@Entity
@Table(name = "servicios")
public class Servicios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idservicio;

    private String nombreservicio;
    private BigDecimal costoservicio;
    private Boolean estservicios;
	
    public Servicios() {
		super();
	}

	public Servicios(Long idservicio, String nombreservicio, BigDecimal costoservicio, Boolean estservicios) {
		super();
		this.idservicio = idservicio;
		this.nombreservicio = nombreservicio;
		this.costoservicio = costoservicio;
		this.estservicios = estservicios;
	}

	public Long getIdservicio() {
		return idservicio;
	}

	public void setIdservicio(Long idservicio) {
		this.idservicio = idservicio;
	}

	public String getNombreservicio() {
		return nombreservicio;
	}

	public void setNombreservicio(String nombreservicio) {
		this.nombreservicio = nombreservicio;
	}

	public BigDecimal getCostoservicio() {
		return costoservicio;
	}

	public void setCostoservicio(BigDecimal costoservicio) {
		this.costoservicio = costoservicio;
	}

	public Boolean getEstservicios() {
		return estservicios;
	}

	public void setEstservicios(Boolean estservicios) {
		this.estservicios = estservicios;
	}
    
    
    
}
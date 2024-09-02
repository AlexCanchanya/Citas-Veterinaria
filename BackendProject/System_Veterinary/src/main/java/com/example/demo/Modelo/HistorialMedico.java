package com.example.demo.Modelo;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "historialmedico")
public class HistorialMedico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idhistorial;

    @ManyToOne
    @JoinColumn(name = "idservicio", nullable = false,
    foreignKey = @ForeignKey(foreignKeyDefinition = 
    "foreign key (idservicio) references servicios(idservicio)"))
    private Servicios servicios;

    @ManyToOne
    @JoinColumn(name = "idmascota", nullable = false,
    foreignKey = @ForeignKey(foreignKeyDefinition = 
    "foreign key (idmascota) references mascotas(idmascota)"))
    private Mascota mascotas;


    private String fecha;
    private String hora;
    private String diagnostico;
    private String tratamiento;
    private String observaciones;
    private BigDecimal monto;
	
    public HistorialMedico() {
		super();
	}

	public HistorialMedico(Long idhistorial, Servicios servicios, Mascota mascotas, String fecha, String hora,
			String diagnostico, String tratamiento, String observaciones, BigDecimal monto) {
		super();
		this.idhistorial = idhistorial;
		this.servicios = servicios;
		this.mascotas = mascotas;
		this.fecha = fecha;
		this.hora = hora;
		this.diagnostico = diagnostico;
		this.tratamiento = tratamiento;
		this.observaciones = observaciones;
		this.monto = monto;
	}

	public Long getIdhistorial() {
		return idhistorial;
	}

	public void setIdhistorial(Long idhistorial) {
		this.idhistorial = idhistorial;
	}

	public Servicios getServicios() {
		return servicios;
	}

	public void setServicios(Servicios servicios) {
		this.servicios = servicios;
	}

	public Mascota getMascotas() {
		return mascotas;
	}

	public void setMascotas(Mascota mascotas) {
		this.mascotas = mascotas;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	public String getDiagnostico() {
		return diagnostico;
	}

	public void setDiagnostico(String diagnostico) {
		this.diagnostico = diagnostico;
	}

	public String getTratamiento() {
		return tratamiento;
	}

	public void setTratamiento(String tratamiento) {
		this.tratamiento = tratamiento;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public BigDecimal getMonto() {
		return monto;
	}

	public void setMonto(BigDecimal monto) {
		this.monto = monto;
	}
    
}










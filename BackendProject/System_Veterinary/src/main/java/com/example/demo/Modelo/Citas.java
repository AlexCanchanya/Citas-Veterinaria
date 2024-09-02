package com.example.demo.Modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "citas")
public class Citas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idcita;

    @ManyToOne
    @JoinColumn(name = "idcliente", nullable = false,
    foreignKey = @ForeignKey(foreignKeyDefinition =
    "foreign key (idcliente) references cliente(idcliente)"))
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "idveterinario", nullable = false,
    foreignKey = @ForeignKey(foreignKeyDefinition = 
    "foreign key (idveterinario) references veterinario(idveterinario)"))
    private Veterinario veterinario;

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

    @ManyToOne
    @JoinColumn(name = "idusuario", nullable = false,
    foreignKey = @ForeignKey(foreignKeyDefinition = 
    "foreign key (idusuario) references usuario(idusuario)"))
    private Usuario usuario;

    private String fechacita;
    private String horacita;
    private String observaciones;
    private String estcita;
	
    public Citas() {
		super();
	}

	public Citas(Long idcita, Cliente cliente, Veterinario veterinario, Servicios servicios, Mascota mascotas,
			Usuario usuario, String fechacita, String horacita, String observaciones, String estcita) {
		super();
		this.idcita = idcita;
		this.cliente = cliente;
		this.veterinario = veterinario;
		this.servicios = servicios;
		this.mascotas = mascotas;
		this.usuario = usuario;
		this.fechacita = fechacita;
		this.horacita = horacita;
		this.observaciones = observaciones;
		this.estcita = estcita;
	}

	public Long getIdcita() {
		return idcita;
	}

	public void setIdcita(Long idcita) {
		this.idcita = idcita;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Veterinario getVeterinario() {
		return veterinario;
	}

	public void setVeterinario(Veterinario veterinario) {
		this.veterinario = veterinario;
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

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getFechacita() {
		return fechacita;
	}

	public void setFechacita(String fechacita) {
		this.fechacita = fechacita;
	}

	public String getHoracita() {
		return horacita;
	}

	public void setHoracita(String horacita) {
		this.horacita = horacita;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public String getEstcita() {
		return estcita;
	}

	public void setEstcita(String estcita) {
		this.estcita = estcita;
	}
    
    
	
    
    
}






package com.example.demo.Modelo;

import jakarta.persistence.*;

@Entity
@Table(name = "mascotas")
public class Mascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idmascota;

    private String nommascota;
    private String espmascota;
    private String razamascota;
    private Integer edadmascota;
    private Integer pesomascota;
    private String sexomascota;
    private String alimascota;
    private String castrado;
    private String fechareg;
    private Boolean estmascota;
    
    @ManyToOne
	@JoinColumn (name="idcliente", nullable=false,
	foreignKey = @ForeignKey(foreignKeyDefinition =
	"foreign key(idcliente) references cliente(idcliente)"))
	private Cliente cliente;

	public Mascota() {
		super();
	}

	public Mascota(Long idmascota, String nommascota, String espmascota, String razamascota, Integer edadmascota,
			Integer pesomascota, String sexomascota, String alimascota, String castrado, String fechareg,
			Boolean estmascota, Cliente cliente) {
		super();
		this.idmascota = idmascota;
		this.nommascota = nommascota;
		this.espmascota = espmascota;
		this.razamascota = razamascota;
		this.edadmascota = edadmascota;
		this.pesomascota = pesomascota;
		this.sexomascota = sexomascota;
		this.alimascota = alimascota;
		this.castrado = castrado;
		this.fechareg = fechareg;
		this.estmascota = estmascota;
		this.cliente = cliente;
	}

	public Long getIdmascota() {
		return idmascota;
	}

	public void setIdmascota(Long idmascota) {
		this.idmascota = idmascota;
	}

	public String getNommascota() {
		return nommascota;
	}

	public void setNommascota(String nommascota) {
		this.nommascota = nommascota;
	}

	public String getEspmascota() {
		return espmascota;
	}

	public void setEspmascota(String espmascota) {
		this.espmascota = espmascota;
	}

	public String getRazamascota() {
		return razamascota;
	}

	public void setRazamascota(String razamascota) {
		this.razamascota = razamascota;
	}

	public Integer getEdadmascota() {
		return edadmascota;
	}

	public void setEdadmascota(Integer edadmascota) {
		this.edadmascota = edadmascota;
	}

	public Integer getPesomascota() {
		return pesomascota;
	}

	public void setPesomascota(Integer pesomascota) {
		this.pesomascota = pesomascota;
	}

	public String getSexomascota() {
		return sexomascota;
	}

	public void setSexomascota(String sexomascota) {
		this.sexomascota = sexomascota;
	}

	public String getAlimascota() {
		return alimascota;
	}

	public void setAlimascota(String alimascota) {
		this.alimascota = alimascota;
	}

	public String getCastrado() {
		return castrado;
	}

	public void setCastrado(String castrado) {
		this.castrado = castrado;
	}

	public String getFechareg() {
		return fechareg;
	}

	public void setFechareg(String fechareg) {
		this.fechareg = fechareg;
	}

	public Boolean getEstmascota() {
		return estmascota;
	}

	public void setEstmascota(Boolean estmascota) {
		this.estmascota = estmascota;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
}
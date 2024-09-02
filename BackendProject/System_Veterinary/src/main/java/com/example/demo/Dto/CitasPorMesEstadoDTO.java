package com.example.demo.Dto;

public class CitasPorMesEstadoDTO {
    private Integer mes;
    private String estcita;
    private Long totalCitas;

    public CitasPorMesEstadoDTO(Integer mes, String estcita, Long totalCitas) {
        this.mes = mes;
        this.estcita = estcita;
        this.totalCitas = totalCitas;
    }

    // Getters y Setters
    public Integer getMes() {
        return mes;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public String getEstcita() {
        return estcita;
    }

    public void setEstcita(String estcita) {
        this.estcita = estcita;
    }

    public Long getTotalCitas() {
        return totalCitas;
    }

    public void setTotalCitas(Long totalCitas) {
        this.totalCitas = totalCitas;
    }
}

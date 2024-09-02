package com.example.demo.Dto;


public class MascotasPorMesDTO {
    private Integer mes;
    private Long totalMascotas;

    public MascotasPorMesDTO(Integer mes, Long totalMascotas) {
        this.mes = mes;
        this.totalMascotas = totalMascotas;
    }

    // Getters y Setters
    public Integer getMes() {
        return mes;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Long getTotalMascotas() {
        return totalMascotas;
    }

    public void setTotalMascotas(Long totalMascotas) {
        this.totalMascotas = totalMascotas;
    }
}


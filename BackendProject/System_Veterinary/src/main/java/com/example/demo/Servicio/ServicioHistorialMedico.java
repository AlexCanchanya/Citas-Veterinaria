package com.example.demo.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Interfaces.IHistorialMedico;
import com.example.demo.Modelo.HistorialMedico;
import com.example.demo.Modelo.Mascota;

@Service
public class ServicioHistorialMedico {

	@Autowired
	private IHistorialMedico ihis;
	
	
	public List<HistorialMedico> listarhistorialmedico(){
		return (List<HistorialMedico>) ihis.findAll();
	}
	
	public List<HistorialMedico> historialPorMascota(Mascota mascota) {
        return ihis.findByMascotas(mascota);
    }
	
	public Optional<HistorialMedico> historialporid(Long idhistorial) {
        return ihis.findByidhistorial(idhistorial);
    }
	
}

package com.example.demo.Interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Modelo.HistorialMedico;
import com.example.demo.Modelo.Mascota;

public interface IHistorialMedico extends CrudRepository<HistorialMedico,Long >{


	 Optional<HistorialMedico> findByidhistorial (Long idhistorial );
	 
	 List<HistorialMedico> findByMascotas(Mascota mascotas); 

	}
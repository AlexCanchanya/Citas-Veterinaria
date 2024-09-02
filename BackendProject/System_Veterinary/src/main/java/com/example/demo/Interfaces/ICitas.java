package com.example.demo.Interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.Modelo.Citas;
import com.example.demo.Modelo.Mascota;

public interface ICitas extends CrudRepository<Citas, Long> {

	Optional<Citas> findByidcita(Long idcita);
	
	@Query(value = "CALL ObtenerCitasPorMesEstado()", nativeQuery = true)
    List<Object[]> obtenerCitasPorMesEstado();
    
    
	 List<Citas> findByMascotas(Mascota mascotas); 

}


package com.example.demo.Interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.demo.Modelo.Cliente;
import com.example.demo.Modelo.Mascota;

public interface IMascota extends CrudRepository<Mascota, Long>{

	    
	 Optional<Mascota> findByidmascota (Long idmascota );
	 
	 List<Mascota> findByCliente(Cliente cliente);

	 @Query(value = "CALL ObtenerMascotasRegistradasPorMes()", nativeQuery = true)
	    List<Object[]> obtenerMascotasPorMes();
}

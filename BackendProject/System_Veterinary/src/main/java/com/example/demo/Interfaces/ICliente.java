package com.example.demo.Interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Modelo.Cliente;

public interface ICliente extends CrudRepository<Cliente, Long> {

	Optional<Cliente> findByidcliente (Long idcliente );
	
	List<Cliente> findByNomclienteContainingAndEstclienteTrue(String nomcliente);
    List<Cliente> findByEstcliente(Boolean estcliente);
}

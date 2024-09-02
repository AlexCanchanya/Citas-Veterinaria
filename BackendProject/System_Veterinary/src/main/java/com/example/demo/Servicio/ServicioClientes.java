package com.example.demo.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Interfaces.ICliente;
import com.example.demo.Modelo.Cliente;

@Service
public class ServicioClientes {

	@Autowired
	private ICliente icli;
	

	public List<Cliente> listarclientes(){
		return (List<Cliente>) icli.findAll();
	}

	public Cliente guardarCliente(Cliente cliente) {
        return icli.save(cliente);
    }
	
	public Cliente actualizarCliente(Cliente cliente) {
        Optional<Cliente> clienteExistente = icli.findById(cliente.getIdcliente());
        if (clienteExistente.isPresent()) {
        	Cliente _cliente = clienteExistente.get();
        	_cliente.setDnicliente(cliente.getDnicliente());
        	_cliente.setNomcliente(cliente.getNomcliente());
        	_cliente.setApecliente(cliente.getApecliente());
        	_cliente.setDircliente(cliente.getDircliente());
        	_cliente.setTelfcliente(cliente.getTelfcliente());
        	_cliente.setSexcliente(cliente.getSexcliente());
        	_cliente.setEstcliente(cliente.getEstcliente());
        	_cliente.setEmailcliente(cliente.getEmailcliente());


            return icli.save(_cliente);
        } else {
            throw new RuntimeException("Cliente no encontrado con ID " + cliente.getIdcliente());
        }
    }
	
	
	public Optional<Cliente> clienteporid(Long idcliente) {
        return icli.findByidcliente(idcliente);
    }
	
	
	public Cliente eliminarCliente(Long idcliente) {
        Optional<Cliente> clienteExistente = icli.findById(idcliente);
        if (clienteExistente.isPresent()) {
        	Cliente cliente = clienteExistente.get();
        	cliente.setEstcliente(false); // Cambiar el estado a eliminado
            return icli.save(cliente);
        } else {
            throw new RuntimeException("Cliente no encontrado con ID " + idcliente);
        }
    }
	
}











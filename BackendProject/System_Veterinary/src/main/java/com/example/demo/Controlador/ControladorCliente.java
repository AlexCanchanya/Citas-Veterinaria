package com.example.demo.Controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelo.Cliente;
import com.example.demo.Servicio.ServicioClientes;

@RestController
@RequestMapping("/Cliente")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorCliente {

	@Autowired
	private ServicioClientes sc;
	
	@GetMapping("/listar2")
	public List<Cliente> listarclientes(){
		return sc.listarclientes();
	}
	
	@PostMapping("/registrar")
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        return sc.guardarCliente(cliente);
    }
    
    @PutMapping("/actualizar")
    public Cliente actualizarCliente(@RequestBody Cliente cliente) {
        return sc.actualizarCliente(cliente);
    }
    
    @GetMapping("/buscar2/{idcliente}")
    public ResponseEntity<Cliente> clienteporid(@PathVariable Long idcliente) {
        Optional<Cliente> cliente = sc.clienteporid(idcliente);
        return cliente.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
        
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Map<String, String>> eliminarCliente(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            sc.eliminarCliente(id);
            response.put("message", "cliente eliminado exitosamente");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
      
}

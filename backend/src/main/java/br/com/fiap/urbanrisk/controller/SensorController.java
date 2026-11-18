package br.com.fiap.urbanrisk.controller;

import br.com.fiap.urbanrisk.model.Sensor;
import br.com.fiap.urbanrisk.service.SensorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sensores")
@CrossOrigin(origins="*")
public class SensorController {
 private final SensorService service;
 public SensorController(SensorService service){this.service=service;}
 @GetMapping public List<Sensor> listar(){return service.listar();}
 @GetMapping("/{id}") public Sensor buscar(@PathVariable Long id){return service.buscarPorId(id);}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Sensor cadastrar(@Valid @RequestBody Sensor sensor){return service.cadastrar(sensor);}
 @PutMapping("/{id}") public Sensor atualizar(@PathVariable Long id,@Valid @RequestBody Sensor sensor){return service.atualizar(id,sensor);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable Long id){service.excluir(id);}
}

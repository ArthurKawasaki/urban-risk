package br.com.fiap.urbanrisk.controller;
import br.com.fiap.urbanrisk.model.Evento;
import br.com.fiap.urbanrisk.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api") @CrossOrigin(origins="*") public class EventoController {
 private final EventoService service;
 public EventoController(EventoService service){this.service=service;}
 @GetMapping("/health") public Map<String,String> health(){return Map.of("status","online");}
 @GetMapping("/eventos") public List<Evento> eventos(){return service.listar();}
 @GetMapping("/eventos/{id}") public Evento buscar(@PathVariable Long id){return service.buscarPorId(id);}
 @PutMapping("/eventos/{id}") public Evento atualizar(@PathVariable Long id,@Valid @RequestBody Evento e){return service.atualizar(id,e);}
 @DeleteMapping("/eventos/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void excluir(@PathVariable Long id){service.excluir(id);}
 @GetMapping("/painel") public Map<String,Object> painel(){return service.painel();}
 @PostMapping("/eventos") @ResponseStatus(HttpStatus.CREATED) public Evento cadastrar(@Valid @RequestBody Evento e){return service.salvar(e);}
}

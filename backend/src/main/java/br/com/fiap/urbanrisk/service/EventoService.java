package br.com.fiap.urbanrisk.service;
import br.com.fiap.urbanrisk.model.Evento;
import br.com.fiap.urbanrisk.repository.EventoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
@Service public class EventoService {
 private final EventoRepository repository;
 public EventoService(EventoRepository repository){this.repository=repository;}
 // Analise explicavel: severidade (ate 70 pontos), confianca (ate 20) e tipo (ate 10).
 public int calcularPrioridade(Evento e){int bonus= switch(e.tipo.toUpperCase(Locale.ROOT)){case "ALAGAMENTO" -> 10;case "SERVICO" -> 7;case "CALOR" -> 5;default -> 0;};return Math.min(100,e.gravidade*14+e.confianca/5+bonus);}
 public List<Evento> listar(){return repository.findAllByOrderByPrioridadeDescCriadoEmDesc();}
 public Evento salvar(Evento e){validar(e);e.id=null;e.criadoEm=LocalDateTime.now();e.prioridade=calcularPrioridade(e);return repository.save(e);}
 public Evento atualizar(Long id, Evento dados){
  Evento atual=buscarPorId(id);
  validar(dados);
  atual.tipo=dados.tipo.toUpperCase(Locale.ROOT);
  atual.bairro=dados.bairro;
  atual.descricao=dados.descricao;
  atual.origem=dados.origem.toUpperCase(Locale.ROOT);
  atual.confianca=dados.confianca;
  atual.gravidade=dados.gravidade;
  atual.prioridade=calcularPrioridade(atual);
  return repository.save(atual);
 }
 public void excluir(Long id){Evento existente=buscarPorId(id);repository.delete(existente);}
 private void validar(Evento e){
  if(e.tipo==null || !Set.of("ALAGAMENTO","CALOR","SERVICO").contains(e.tipo.toUpperCase(Locale.ROOT)))throw new IllegalArgumentException("Tipo de risco invalido");
  if(e.origem==null || !Set.of("SENSOR","BASE_PUBLICA","COMUNIDADE").contains(e.origem.toUpperCase(Locale.ROOT)))throw new IllegalArgumentException("Origem invalida");
 }
 public Evento buscarPorId(Long id){return repository.findById(id).orElseThrow(()->new br.com.fiap.urbanrisk.exception.RecursoNaoEncontradoException("Ocorrencia nao encontrada: " + id));}
 public Map<String,Object> painel(){List<Evento> eventos=listar();return Map.of("total",eventos.size(),"criticos",eventos.stream().filter(e->e.prioridade>=75).count(),"alertas",eventos.stream().filter(e->e.prioridade>=55).count(),"atualizadoEm",LocalDateTime.now().toString());}
}

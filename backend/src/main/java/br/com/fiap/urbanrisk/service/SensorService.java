package br.com.fiap.urbanrisk.service;

import br.com.fiap.urbanrisk.model.Sensor;
import br.com.fiap.urbanrisk.repository.SensorRepository;
import br.com.fiap.urbanrisk.exception.RecursoNaoEncontradoException;
import br.com.fiap.urbanrisk.exception.RecursoDuplicadoException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class SensorService {
 private final SensorRepository repository;
 public SensorService(SensorRepository repository){this.repository=repository;}
 public List<Sensor> listar(){return repository.findAll();}
 public Sensor buscarPorId(Long id){return repository.findById(id).orElseThrow(()->new RecursoNaoEncontradoException("Sensor nao encontrado: "+id));}
 @Transactional public Sensor cadastrar(Sensor sensor){
  normalizar(sensor);
  if(repository.existsByCodigoIgnoreCase(sensor.codigo))throw new RecursoDuplicadoException("Codigo do sensor ja cadastrado: "+sensor.codigo);
  sensor.id=null;
  return repository.save(sensor);
 }
 @Transactional public Sensor atualizar(Long id, Sensor dados){
  Sensor sensor=buscarPorId(id);
  normalizar(dados);
  repository.findByCodigoIgnoreCase(dados.codigo).ifPresent(existente->{
   if(!existente.id.equals(id))throw new RecursoDuplicadoException("Codigo do sensor ja cadastrado: "+dados.codigo);
  });
  sensor.codigo=dados.codigo;sensor.bairro=dados.bairro;sensor.tipo=dados.tipo;sensor.ativo=dados.ativo;
  return repository.save(sensor);
 }
 @Transactional public void excluir(Long id){repository.delete(buscarPorId(id));}
 private void normalizar(Sensor sensor){
  if(sensor.codigo==null||sensor.codigo.isBlank())throw new IllegalArgumentException("Codigo obrigatorio");
  sensor.codigo=sensor.codigo.trim().toUpperCase(java.util.Locale.ROOT);
 }
}

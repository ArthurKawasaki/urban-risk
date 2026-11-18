package br.com.fiap.urbanrisk.config;
import br.com.fiap.urbanrisk.model.Evento;
import br.com.fiap.urbanrisk.repository.EventoRepository;
import br.com.fiap.urbanrisk.service.EventoService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
@Configuration public class DadosIniciais {
 @Bean CommandLineRunner carregar(EventoRepository repo, EventoService service){return args->{if(repo.count()>0)return;
 criar(service,"ALAGAMENTO","Centro","Nivel de agua elevado em via publica","SENSOR",95,5);
 criar(service,"CALOR","Vila Mariana","Temperatura elevada em area urbana","BASE_PUBLICA",85,3);
 criar(service,"SERVICO","Pinheiros","Interrupcao no fornecimento de energia","COMUNIDADE",60,4);
 };}
 private void criar(EventoService s,String tipo,String bairro,String descricao,String origem,int confianca,int gravidade){Evento e=new Evento();e.tipo=tipo;e.bairro=bairro;e.descricao=descricao;e.origem=origem;e.confianca=confianca;e.gravidade=gravidade;s.salvar(e);}
}

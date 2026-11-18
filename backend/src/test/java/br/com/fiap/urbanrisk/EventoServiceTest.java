package br.com.fiap.urbanrisk;
import br.com.fiap.urbanrisk.model.Evento;
import br.com.fiap.urbanrisk.service.EventoService;
import br.com.fiap.urbanrisk.repository.EventoRepository;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
class EventoServiceTest {
 @Test void eventoMaisGraveTemMaiorPrioridade(){EventoService s=new EventoService(mock(EventoRepository.class));Evento a=new Evento();a.tipo="CALOR";a.gravidade=1;a.confianca=80;Evento b=new Evento();b.tipo="CALOR";b.gravidade=5;b.confianca=80;assertTrue(s.calcularPrioridade(b)>s.calcularPrioridade(a));}
}

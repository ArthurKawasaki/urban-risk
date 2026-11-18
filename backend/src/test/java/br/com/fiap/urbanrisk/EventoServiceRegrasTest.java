package br.com.fiap.urbanrisk;
import br.com.fiap.urbanrisk.model.Evento;
import br.com.fiap.urbanrisk.repository.EventoRepository;
import br.com.fiap.urbanrisk.service.EventoService;
import br.com.fiap.urbanrisk.exception.RecursoNaoEncontradoException;
import org.junit.jupiter.api.Test;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class EventoServiceRegrasTest {
 private final EventoRepository repository=mock(EventoRepository.class);
 private final EventoService service=new EventoService(repository);
 @Test void rejeitaTipoInvalido(){Evento e=evento();e.tipo="OUTRO";assertThrows(IllegalArgumentException.class,()->service.salvar(e));}
 @Test void rejeitaOrigemInvalida(){Evento e=evento();e.origem="DESCONHECIDA";assertThrows(IllegalArgumentException.class,()->service.salvar(e));}
 @Test void limitaPrioridadeA100(){Evento e=evento();e.gravidade=5;e.confianca=100;assertEquals(100,service.calcularPrioridade(e));}
 @Test void retornaEventoPorId(){Evento e=evento();e.id=4L;when(repository.findById(4L)).thenReturn(Optional.of(e));assertEquals(4L,service.buscarPorId(4L).id);}
 @Test void retorna404QuandoEventoNaoExiste(){when(repository.findById(999L)).thenReturn(Optional.empty());assertThrows(RecursoNaoEncontradoException.class,()->service.buscarPorId(999L));}
 private Evento evento(){Evento e=new Evento();e.tipo="ALAGAMENTO";e.bairro="Centro";e.descricao="Rua alagada";e.origem="COMUNIDADE";e.confianca=60;e.gravidade=3;return e;}
}
